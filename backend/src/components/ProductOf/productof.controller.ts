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
import { ProductOfService } from './productOf.service';
import { AddProductOfDTO, EditProductOfDTO, deleteProductOfDTO, getAllProductOfDTO, getProductOfDTO } from './productOf.dto';
import { getAllProductDTO, getProductDTO } from '../Product/product.dto';
import { AuthGuard } from '../../helperFunction/AuthGuard';



@Controller('productof')
export class ProductOfController {
    constructor(private readonly productOfService: ProductOfService) { }
    @UseGuards(AuthGuard)
    @Post('/')
    async add(@Body() obj: AddProductOfDTO, @Response() res, @Request() req) {
        const response = await this.productOfService.addProductOf(obj);
        return res.status(response.status).json({
            ...response
        });

    }
    @UseGuards(AuthGuard)
    @Get('/by-paginate')
    async getAllProductOfByPaginate(@Query() obj:getProductDTO, @Response() res, @Request() req) {
     
        const response = await this.productOfService.getAllProductOfPagination(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }
    @UseGuards(AuthGuard)
    @Get('/')
    async getAllProductOf(@Query() obj:getAllProductDTO, @Response() res, @Request() req) {
     
        const response = await this.productOfService.getAllProductOf(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }
    @UseGuards(AuthGuard)
    @Put('/update')
    async update(@Body() obj: EditProductOfDTO, @Response() res, @Request() req) {
      
        const response = await this.productOfService.updateProductOf(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }
    @UseGuards(AuthGuard)
    @Delete('/delete')
    async deleteProductOf(@Query() obj:deleteProductOfDTO, @Response() res, @Request() req) {
     
        const response = await this.productOfService.deleteProductOf(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }




}

