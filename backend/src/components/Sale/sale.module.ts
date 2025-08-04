import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { CustomerModule } from '../Customer/customer.module';



@Module({
  imports: [CustomerModule],
  controllers: [SaleController],
  providers: [SaleService]
})
export class SaleModule {}
