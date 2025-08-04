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
import { SiteService } from './sitemanagement.service';
import { AuthGuard } from '../../helperFunction/AuthGuard';
import { addExpenseDTO, addSiteManagementDTO, getAllSiteDTO, getSiteDTO, updateSiteManagementDTO } from './sitemanagement.dto';

@Controller('site')
export class SiteController {
    constructor(private readonly siteService: SiteService) { }

    @UseGuards(AuthGuard)
    @Post('/')
    async add(@Body() obj: addSiteManagementDTO, @Response() res, @Request() req) {
        const response = await this.siteService.addSite(obj);
        return res.status(response.status).json({
            ...response,
        });
    }

    @UseGuards(AuthGuard)
    @Get('/by-paginate')
    async getPaginate(@Query() obj: getSiteDTO, @Response() res, @Request() req) {
        const response = await this.siteService.getAllSitePagination(obj);
        return res.status(response.status).json({
            ...response,
        });
    }

    @UseGuards(AuthGuard)
    @Get('/')
    async get(@Query() obj: getAllSiteDTO, @Response() res, @Request() req) {
        const response = await this.siteService.getAllSite(obj);
        return res.status(response.status).json({
            ...response,
        });
    }

    @UseGuards(AuthGuard)
    @Put('/update')
    async update(@Body() obj: updateSiteManagementDTO, @Response() res, @Request() req) {

        const response = await this.siteService.updateSite(obj);
        return res.status(response.status).json({
            ...response
        });

    }

    @UseGuards(AuthGuard)
    @Put('/add-expense')
    async addExpense(@Body() obj: addExpenseDTO, @Response() res, @Request() req) {

        const response = await this.siteService.addExpense(obj);
        return res.status(response.status).json({
            ...response
        });

    }

}