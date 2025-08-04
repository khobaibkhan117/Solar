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
    Put,
    Delete
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AddCustomerDTO, EditCustomerDTO, deleteCustomerDTO, getAllCustomertDTO, getCustomertByIDDTO, getCustomertDTO, updateBalanceDTO } from './customer.dto';
import { AuthGuard } from '../../helperFunction/AuthGuard';


@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @UseGuards(AuthGuard)
    @Post('/')
    async add(@Body() obj: AddCustomerDTO, @Response() res, @Request() req) {
        const response = await this.customerService.addCustomer(obj);
        return res.status(response.status).json({
            ...response
        });

    }

    @UseGuards(AuthGuard)
    @Get('/by-paginate')
    async getAllCustomerByPaginate(@Query() obj:getCustomertDTO, @Response() res, @Request() req) {
     
        const response = await this.customerService.getAllCustomerPagination(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }

    @UseGuards(AuthGuard)
    @Get('/')
    async getAllCustomer(@Query() obj:getAllCustomertDTO, @Response() res, @Request() req) {
     
        const response = await this.customerService.getAllCustomer(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }
    
    @UseGuards(AuthGuard)
    @Put('/update')
    async update(@Body() obj: EditCustomerDTO, @Response() res, @Request() req) {
      
        const response = await this.customerService.updateCustomer(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }

    @UseGuards(AuthGuard)
    @Delete('/delete')
    async deleteCustomer(@Query() obj:deleteCustomerDTO, @Response() res, @Request() req) {
     
        const response = await this.customerService.deleteCustomer(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }


    @UseGuards(AuthGuard)
    @Get('/by-id')
    async getCustomerByID(@Query() obj:getCustomertByIDDTO, @Response() res, @Request() req) {
     
        const response = await this.customerService.getCustomerByID(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }

    @UseGuards(AuthGuard)
    @Put('/update-balance')
    async updateBalance(@Body() obj: updateBalanceDTO, @Response() res, @Request() req) {
      
        const response = await this.customerService.updateCustomerBalance(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }

    @UseGuards(AuthGuard)
    @Get('/pending-payments')
    async getCustomerPendingPayment(@Query() obj, @Response() res, @Request() req) {
     
        const response = await this.customerService.getPaymentPendingCustomer();
        return res.status(response.status).json({
          ...response
        });
      
    }




}

