import {
  Injectable,
  forwardRef,
  Inject,
  Scope,
  UseGuards
} from '@nestjs/common';
import { paginationOptions } from '../../helperFunction/PaginationOption';
import { userInterface, User } from '../../Models/user';
import { AddUserDTO, SignInUserDTO, getAllUserDTO, getUserPaginationDTO, updateUserBGImageDTO, updateUserDTO, updateUserPasswordDTO, updateUserStatusDTO } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import { MENUITEMS } from '../../helperFunction/customeFunctions';
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
import { format, toZonedTime } from 'date-fns-tz';
import * as process from 'process';

const PAKISTAN_TZ = process.env.TZ || 'Asia/Karachi';

@Injectable({ scope: Scope.REQUEST })
export class UserService {

  constructor(private jwtService: JwtService) { }

  async addUser(obj: AddUserDTO) {
    try {

      let checkExist = await User.findOne({ email: obj.user_email?.toLowerCase()?.trim() })
      if (checkExist) {
        return {
          status: 400,
          message: 'User Email Already Exist',

        };
      }

      const hash = bcrypt.hashSync(obj.password, saltRounds);

      let userToAdd: userInterface = {
        _id: `${obj.user_email?.toLowerCase()?.trim()}_${new Date().getTime()}`,
        name: obj.name?.trim() ? obj.name?.trim() : "",
        profile_picture: obj.profile_picture ? obj.profile_picture : '',
        password: hash,
        email: obj.user_email?.trim() ? obj.user_email?.toLowerCase()?.trim() : '',
        contact_no: obj.contact_no?.trim() ? obj.contact_no?.trim() : '',
        creation_time: new Date().getTime(),
        creation_date: format(toZonedTime(new Date(), PAKISTAN_TZ), 'dd-MM-yyyy', { timeZone: PAKISTAN_TZ }),
        status: true,
        features: obj.features ? obj.features : '',
        product_of: obj.product_of ? obj.product_of : '',
        forget_otp: '',
        product_of_id: obj.product_of_id ? obj.product_of_id : ''
      };


      let response = await User.create(userToAdd);

      if (response) {
        console.log(
          'User add success  ',
          userToAdd._id,
          ' ',
          new Date().toString().slice(0, 24),

        );

        return {
          status: 200,
          message: 'User Added successfully',

        };
      }
      else {
        return {
          status: 400,
          message: response['message']
        }
      }

    }
    catch (err) {
      console.log("Error While Adding User " + err.message)
      return { status: 500, message: err.message }
    }
  }

  async addAdminUser(obj: AddUserDTO) {
    try {

      let checkExist = await User.findOne({ email: obj.user_email?.toLowerCase()?.trim() })
      if (checkExist) {
        return {
          status: 400,
          message: 'User Email Already Exist',

        };
      }
      // let password = this.generatePassword()

      // console.log("Email => ", obj.user_email, "----  Password=> ", password)

      const hash = bcrypt.hashSync(obj.password, saltRounds);

      let userToAdd: userInterface = {
        _id: `${obj.user_email?.toLowerCase()?.trim()}_${new Date().getTime()}`,
        name: obj.name?.trim() ? obj.name?.trim() : "",
        profile_picture: obj.profile_picture ? obj.profile_picture : '',
        password: hash,
        email: obj.user_email?.trim() ? obj.user_email?.toLowerCase()?.trim() : '',
        contact_no: obj.contact_no?.trim() ? obj.contact_no?.trim() : '',
        creation_time: new Date().getTime(),
        creation_date: format(toZonedTime(new Date(), PAKISTAN_TZ), 'dd-MM-yyyy', { timeZone: PAKISTAN_TZ }),
        status: true,
        features: JSON.stringify(MENUITEMS),
        product_of: obj.product_of ? obj.product_of : '',
        forget_otp: '',
        product_of_id: obj.product_of_id ? obj.product_of_id : ''
      };


      let response = await User.create(userToAdd);

      if (response) {
        console.log(
          'User add success  ',
          userToAdd._id,
          ' ',
          new Date().toString().slice(0, 24),

        );

        return {
          status: 200,
          message: 'User Added successfully',

        };
      }
      else {
        return {
          status: 400,
          message: response['message']
        }
      }

    }
    catch (err) {
      console.log("Error While Adding User " + err.message)
      return { status: 500, message: err.message }
    }
  }

  async signInUser(obj: SignInUserDTO) {

    try {
      const Exist = await User.findOne({ email: obj.email?.trim()?.toLowerCase() })


      if (!Exist) {
        return {
          status: 404,
          message: 'Invalid Email',

        };

      }

      const comparePassword = bcrypt.compareSync(obj.password, Exist.password)
      if (!comparePassword) {
        return {
          status: 404,
          message: 'Invalid Password',

        };
      }
      if (!Exist.status) {
        return { status: 400, message: "User Blocked. Contact with Adminstrator" }
      }

      // var token = jwt.sign({ email:Exist.email }, process.env.PRIVATE_KEY , { expiresIn: '1h'});
      const { password, profile_picture, ...returnData } = Exist._doc
      const token = await this.jwtService.signAsync({ email: returnData.email }, { secret: process.env.PRIVATE_KEY })


      return { status: 200, message: "Successfully Login", data: { ...returnData, token, profile_picture } }

    }
    catch (err) {
      console.log("Error While Adding User " + err.message)
      return { status: 500, message: err.message }
    }

  }

  async getAllUserPagination(obj: getUserPaginationDTO) {
    try {
      let query = User.aggregate();

      let options = paginationOptions(
        obj.page_number,
        obj.page_size,
        'creation_time',
        'desc',
      );
      if (obj.product_of_id && obj.name?.trim()) {
        query = User.aggregate([{ $match: { product_of_id: obj.product_of_id, name: { $regex: new RegExp(obj.name?.trim(), 'i') } } }]);
      } else if (obj.name?.trim()) {
        query = User.aggregate([{ $match: { name: { $regex: new RegExp(obj.name?.trim(), 'i') } } }]);
      }
      else if (obj.product_of_id) {
        query = User.aggregate([{ $match: { product_of_id: obj.product_of_id } }]);
      } else {
        query = User.aggregate([{ $match: {} }]);

      }




      let allItems = await User.aggregatePaginate(query, options.options);

      if (allItems.docs.length > 0) {
        return {
          status: 200,
          totalRecords: allItems.totalDocs,
          data: allItems.docs,
          totalPages: allItems.totalPages,
        };
      } else {
        return {
          status: 404,
          totalRecords: 0,
          data: [],
          totalPages: 0,
          message: 'Record Not Found',
        };
      }


    }
    catch (err) {
      console.log("Error While getting User Pagination " + err.message)
      return { status: 500, message: err.message }
    }
  }
  async getAllUsers(obj: getAllUserDTO) {
    try {
      let allItems = []
      if (obj.product_of_id) {
        allItems = await User.find({ product_of_id: obj.product_of_id });

      } else {
        allItems = await User.find({});


      }


      if (allItems.length > 0) {
        return {
          status: 200,
          data: allItems,

        };
      } else {
        return {
          status: 404,
          totalRecords: 0,
          data: [],
          totalPages: 0,
          message: 'Record Not Found',
        };
      }


    }
    catch (err) {
      console.log("Error While getting Users " + err.message)
      return { status: 500, message: err.message }
    }
  }

  async updateUserStatus(obj: updateUserStatusDTO) {
    try {

      await User.findByIdAndUpdate({ _id: obj._id }, { status: obj.status })



      return { status: 200, message: "User Status Updated Successfully" }






    }
    catch (err) {
      console.log("Error While Updating Users " + err.message)
      return { status: 500, message: err.message }
    }
  }


  async updateUserBGImage(obj: updateUserBGImageDTO) {
    try {

      await User.findOneAndUpdate({ email: obj.email }, { bg_image: obj.bg_image })



      return { status: 200, message: "User Image Updated Successfully" }






    }
    catch (err) {
      console.log("Error While Updating Users " + err.message)
      return { status: 500, message: err.message }
    }
  }

  async updateUser(obj: updateUserDTO) {
    try {
      let updateFields = {
        name: obj.name,
        email: obj.user_email,
        profile_picture: obj.profile_picture,
        product_of: obj.product_of,
        product_of_id: obj.product_of_id,
        contact_no: obj.contact_no,
        features: obj.features
      }

      //  let removeEmptyFields = Object.fromEntries(
      //     Object.entries(updateFields).filter(([_, v]) => v !== undefined && v !== "")
      //   )

      await User.findByIdAndUpdate({ _id: obj._id }, updateFields)





      return { status: 200, message: "User Updated Successfully" }






    }
    catch (err) {
      console.log("Error While Updating Users " + err.message)
      return { status: 500, message: err.message }
    }
  }


  async updateUserPassword(obj: updateUserPasswordDTO) {
    try {
      const findUser = await User.findOne({ email: obj.email?.trim()?.toLowerCase() })
      if (!findUser) {
        return { status: 404, message: "User Not Found" }
      }

      const comparePassword = bcrypt.compareSync(obj.password, findUser.password)
      if (!comparePassword) {
        return {
          status: 404,
          message: 'Old Password incorrect.',

        };
      }

      const hash = bcrypt.hashSync(obj.new_password, saltRounds);





      await User.findOneAndUpdate({ email: obj.email?.trim()?.toLowerCase() }, { password: hash })



      return { status: 200, message: "User Password Updated Successfully" }






    }
    catch (err) {
      console.log("Error While Updating Users " + err.message)
      return { status: 500, message: err.message }
    }
  }


  generatePassword() {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.@!?';

    let code = '';


    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  }






}