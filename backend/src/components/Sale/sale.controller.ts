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
  Delete,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { addSaleDTO, deleteSaleDTO, getSalePaginateDTO } from './sale.dto';
import { AuthGuard } from '../../helperFunction/AuthGuard';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async add(@Body() obj: addSaleDTO, @Response() res, @Request() req) {
    const response = await this.saleService.addSale(obj);
    return res.status(response.status).json({
      ...response,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/by-paginate')
  async getAllSaleByPaginate(
    @Query() obj: getSalePaginateDTO,
    @Response() res,
    @Request() req,
  ) {
    const response = await this.saleService.getAllSalePagination(obj);
    return res.status(response.status).json({
      ...response,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/delete')
  async delete(@Body() obj: deleteSaleDTO, @Response() res, @Request() req) {
    const response = await this.saleService.deleteSale(obj);
    return res.status(response.status).json({
      ...response,
    });
  }
}
