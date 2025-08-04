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
import { InventoryService } from './inventory.service';
import { AddInventoryDTO, deleteInvenotryrDTO, getAllInventorytDTO, getInventoryReporttDTO, getInventorytDTO, updateInventoryQuantitytDTO } from './inventory.dto';
import { AuthGuard } from '../../helperFunction/AuthGuard';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @UseGuards(AuthGuard)
  @Post('/')
  async add(@Body() obj: AddInventoryDTO, @Response() res, @Request() req) {
    const response = await this.inventoryService.addInventory(obj);
    return res.status(response.status).json({
      ...response
    });

  }
  @UseGuards(AuthGuard)
  @Get('/by-paginate')
  async getAllInventoryByPaginate(@Query() obj: getInventorytDTO, @Response() res, @Request() req) {

    const response = await this.inventoryService.getAllInventoryPagination(obj);
    return res.status(response.status).json({
      ...response
    });

  }

  @UseGuards(AuthGuard)
  @Get('/report')
  async getAllInventoryReport(@Query() obj: getInventoryReporttDTO, @Response() res, @Request() req) {

    const response = await this.inventoryService.getAllInventoryReport(obj);
    return res.status(response.status).json({
      ...response
    });

  }

  @UseGuards(AuthGuard)
  @Get('/')
  async getAllInventory(@Query() obj: getAllInventorytDTO, @Response() res, @Request() req) {

    const response = await this.inventoryService.getAllInventory(obj);
    return res.status(response.status).json({
      ...response
    });

  }
  @UseGuards(AuthGuard)
  @Put('/update-quantity')
  async update(@Body() obj: updateInventoryQuantitytDTO, @Response() res, @Request() req) {

    const response = await this.inventoryService.updateInventoryQuantity(obj);
    return res.status(response.status).json({
      ...response
    });

  }



  @UseGuards(AuthGuard)
  @Delete('/delete')
  async deleteInventory(@Query() obj: deleteInvenotryrDTO, @Response() res, @Request() req) {

    const response = await this.inventoryService.deleteInventory(obj);
    return res.status(response.status).json({
      ...response
    });

  }



}