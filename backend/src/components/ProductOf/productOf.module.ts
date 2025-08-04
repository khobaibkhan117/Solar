import { Module } from '@nestjs/common';
import { ProductOfController } from './productof.controller';
import { ProductOfService } from './productOf.service';



@Module({
    controllers: [ProductOfController],
    providers: [ProductOfService]
  })
  export class ProductOfModule {}