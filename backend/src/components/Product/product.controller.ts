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


  import { ProductService } from './product.service';
  import { addProductDTO, deleteProductDTO, editProductDTO, getAllProductDTO, getProductDTO } from './product.dto';
import { AuthGuard } from '../../helperFunction/AuthGuard';
  @Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async add(@Body() obj: addProductDTO, @Response() res, @Request() req) {
    
      const response = await this.productService.addProduct(obj);
      return res.status(response.status).json({
        ...response
      });
    
  }

  @UseGuards(AuthGuard)
  @Put('/update')
  async update(@Body() obj: editProductDTO, @Response() res, @Request() req) {
    
      const response = await this.productService.editProduct(obj);
      return res.status(response.status).json({
        ...response
      });
    
  }


  @UseGuards(AuthGuard)
  @Get('/by-paginate')
  async getAllProductByPaginate(@Query() obj:getProductDTO, @Response() res, @Request() req) {
      const response = await this.productService.getAllProductPagination(obj);
      return res.status(response.status).json({
        ...response
      });
    
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async getAllProduct(@Query() obj:getAllProductDTO, @Response() res, @Request() req) {
   
      const response = await this.productService.getAllProduct(obj);
      return res.status(response.status).json({
        ...response
      });
    
  }

@UseGuards(AuthGuard)
  @Delete('/delete')
  async deleteProduct(@Query() obj:deleteProductDTO, @Response() res, @Request() req) {
   
      const response = await this.productService.deleteProduct(obj);
      return res.status(HttpStatus.OK).json({
        ...response
      });
    
  }

  
 

}
