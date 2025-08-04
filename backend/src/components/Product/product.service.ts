import {
  Injectable,
  forwardRef,
  Inject,
  Scope,
  UseGuards
} from '@nestjs/common';
import { paginationOptions } from '../../helperFunction/PaginationOption';
import { Product, ProductInterface } from '../../Models/product';
import { addProductDTO, deleteProductDTO, editProductDTO, getAllProductDTO, getProductDTO } from './product.dto';
import { format, toZonedTime } from 'date-fns-tz';
import * as process from 'process';

const PAKISTAN_TZ = process.env.TZ || 'Asia/Karachi';

@Injectable({ scope: Scope.REQUEST })
export class ProductService {

  async addProduct(obj: addProductDTO) {
    try {

      let checkExist = await Product.findOne({ code: obj.code })
      if (checkExist) {
        return {
          status: 400,
          message: 'Product Code Already Exist',

        };
      }



      let productToAdd: ProductInterface = {
        _id: `${obj.code}_${new Date().getTime()}`,
        name: obj.name ? obj.name?.trim() : "",
        code: obj.code ? obj.code?.trim() : '',
        company_name: obj.company_name ? obj.company_name?.trim() : '',
        price: obj.price ? obj.price?.trim() : '',
        cost: obj.cost ? obj.cost?.trim() : '',
        creation_time: new Date().getTime(),
        creation_date: format(toZonedTime(new Date(), PAKISTAN_TZ), 'dd-MM-yyyy', { timeZone: PAKISTAN_TZ }),
        status: true,
        alert: obj.alert ? obj.alert?.trim() : '',
        created_by: obj.email ? obj.email?.trim()?.toLowerCase() : "",
        picture: obj.picture ? obj.picture : '',
        description: obj.description ? obj.description?.trim() : '',
        watt: obj.watt ? obj.watt?.trim() : ''
      };


      let response = await Product.create(productToAdd);

      if (response) {
        console.log(
          'Product add success  ',
          productToAdd._id,
          ' ',
          new Date().toString().slice(0, 24),

        );

        return {
          status: 200,
          message: 'Product Added successfully',

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
      console.log("Error While Adding Product " + err.message)
      return { status: 500, message: err.message }
    }
  }


  async editProduct(obj: editProductDTO) {
    try {
      const checkDuplicate = await Product.findOne({ code: obj.code })
      if (checkDuplicate && obj._id != checkDuplicate?._id) {
        return {
          status: 400,
          message: 'Product Code Already Exist',

        };
      }
      let productToUpdate = {
        _id: obj._id,
        name: obj.name ? obj.name?.trim() : "",
        code: obj.code ? obj.code?.trim() : '',
        company_name: obj.company_name ? obj.company_name?.trim() : '',
        price: obj.price ? obj.price?.trim() : '',
        cost: obj.cost ? obj.cost?.trim() : '',
        alert: obj.alert ? obj.alert?.trim() : '',
        picture: obj.picture ? obj.picture : '',
        description: obj.description ? obj.description?.trim() : '',
        watt: obj.watt ? obj.watt?.trim() : ""
      };
      await Product.updateOne({ _id: obj._id }, { $set: productToUpdate })

      return { status: 200, message: "Product Successfully Updated" }

    } catch (err) {
      console.log("Error While Updating Product " + err.message)
      return { status: 500, message: err.message }
    }
  }

  async getAllProductPagination(obj: getProductDTO) {
    try {
      let query = Product.aggregate();

      let options = paginationOptions(
        obj.page_number,
        obj.page_size,
        'creation_time',
        'desc',
      );

      if (obj.name?.trim()) {
        query = Product.aggregate([{ $match: { name: { $regex: new RegExp(obj.name, 'i') } } }]);

      } else {
        query = Product.aggregate([{ $match: {} }]);

      }



      let allItems = await Product.aggregatePaginate(query, options.options);

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
      console.log("Error While getting Product " + err.message)
      return { status: 500, message: err.message }
    }
  }

  async getAllProduct(obj: getAllProductDTO) {
    try {



      let allItems = await Product.find({});

      if (allItems.length > 0) {
        return {
          status: 200,
          data: allItems

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
      console.log("Error While getting Product " + err.message)
      return { status: 500, message: err.message }
    }
  }

  async deleteProduct(obj: deleteProductDTO) {
    try {
      const deletedDocument = await Product.findOneAndDelete({ _id: obj.id })



      return { status: 200, message: "Product Successfully Deleted" }

    } catch (err) {
      console.log("Error While Deleting Product " + err.message)
      return { status: 500, message: err.message }

    }
  }


}