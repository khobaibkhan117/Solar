import {
  Body,
  Controller,
  Post,
  Response,
  Request,
  HttpStatus,
  Get,
  UseGuards,
  Query,
  Param,
  Put
} from '@nestjs/common';


import { UserService } from './user.service';
import { AddUserDTO, SignInUserDTO, getAllUserDTO, getUserPaginationDTO, updateUserBGImageDTO, updateUserDTO, updateUserPasswordDTO, updateUserStatusDTO } from './user.dto';
import { AuthGuard } from '../../helperFunction/AuthGuard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Post('/')
  async add(@Body() obj: AddUserDTO, @Response() res, @Request() req) {

    const response = await this.userService.addUser(obj);
    return res.status(response.status).json({
      ...response
    });

  }

  @Post('/admin-user')
  async addAdminUser(@Body() obj: AddUserDTO, @Response() res, @Request() req) {

    const response = await this.userService.addAdminUser(obj);
    return res.status(response.status).json({
      ...response
    });

  }

  @Get('/')
  async signIn(@Query() obj: SignInUserDTO, @Response() res, @Request() req) {

    const response = await this.userService.signInUser(obj);
    return res.status(response.status).json({
      ...response
    });

  }


  @UseGuards(AuthGuard)
  @Get('/by-paginate')
  async getAllsersByPaginate(@Query() obj: getUserPaginationDTO, @Response() res, @Request() req) {
    const response = await this.userService.getAllUserPagination(obj);
    return res.status(response.status).json({
      ...response
    });

  }

  @UseGuards(AuthGuard)
  @Get('/all')
  async getAllUsers(@Query() obj: getAllUserDTO, @Response() res, @Request() req) {
    const response = await this.userService.getAllUsers(obj);
    return res.status(response.status).json({
      ...response
    });

  }


  @UseGuards(AuthGuard)
  @Put('/update-status')
  async updateStatus(@Body() obj: updateUserStatusDTO, @Response() res, @Request() req) {

    const response = await this.userService.updateUserStatus(obj);
    return res.status(response.status).json({
      ...response
    });

  }

  @UseGuards(AuthGuard)
  @Put('/update-bg-image')
  async updateBackgroundImage(@Body() obj: updateUserBGImageDTO, @Response() res, @Request() req) {

    const response = await this.userService.updateUserBGImage(obj);
    return res.status(response.status).json({
      ...response
    });

  }


  @UseGuards(AuthGuard)
  @Put('/update-password')
  async updatePassword(@Body() obj: updateUserPasswordDTO, @Response() res, @Request() req) {

    const response = await this.userService.updateUserPassword(obj);
    return res.status(response.status).json({
      ...response
    });

  }

  @UseGuards(AuthGuard)
  @Put('/')
  async update(@Body() obj: updateUserDTO, @Response() res, @Request() req) {

    const response = await this.userService.updateUser(obj);
    return res.status(response.status).json({
      ...response
    });

  }



}
