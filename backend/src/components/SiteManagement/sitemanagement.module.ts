import { Module } from '@nestjs/common';
import { SiteController } from './sitemanagement.controller';
import { SiteService } from './sitemanagement.service';




@Module({
    imports: [],
    controllers: [SiteController],
    providers: [SiteService]
})
export class SiteModule { }
