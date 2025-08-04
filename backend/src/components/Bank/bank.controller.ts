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
import { BankService } from './bank.service';
import { AuthGuard } from '../../helperFunction/AuthGuard';
import { AddBankDTO, EditBankDTO, getBanktDTO ,getAllBankDTO,deleteBankDTO} from './bank.dto';


@Controller('bank')
export class BankController {
    constructor(private readonly bankService: BankService) { }

    @UseGuards(AuthGuard)
    @Post('/')
    async add(@Body() obj: AddBankDTO, @Response() res, @Request() req) {
        const response = await this.bankService.addBank(obj);
        return res.status(response.status).json({
            ...response
        });

    }

    @UseGuards(AuthGuard)
    @Get('/by-paginate')
    async getAllBankByPaginate(@Query() obj:getBanktDTO, @Response() res, @Request() req) {
     
        const response = await this.bankService.getAllBankPagination(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }

    @UseGuards(AuthGuard)
    @Get('/')
    async getAllBanks(@Query() obj:getAllBankDTO, @Response() res, @Request() req) {
     
        const response = await this.bankService.getAllBank(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }
    
    @UseGuards(AuthGuard)
    @Put('/update')
    async update(@Body() obj: EditBankDTO, @Response() res, @Request() req) {
      
        const response = await this.bankService.updateBank(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }

    @UseGuards(AuthGuard)
    @Delete('/delete')
    async deleteBank(@Query() obj:deleteBankDTO, @Response() res, @Request() req) {
     
        const response = await this.bankService.deleteBank(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }




}

