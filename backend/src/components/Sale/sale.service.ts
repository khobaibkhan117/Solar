import {
  Injectable,
  forwardRef,
  Inject,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { paginationOptions } from '../../helperFunction/PaginationOption';
import { Sale, salesInterface } from '../../Models/sales';
import { Inventory } from '../../Models/inventory';
import { addSaleDTO, deleteSaleDTO, getSalePaginateDTO } from './sale.dto';
import { format, toZonedTime } from 'date-fns-tz';
import * as process from 'process';
import { CustomerService } from '../Customer/customer.service';
import { Customer } from '../../Models/customers';

const PAKISTAN_TZ = process.env.TZ || 'Asia/Karachi';

@Injectable({ scope: Scope.REQUEST })
export class SaleService {
  constructor(private customerService: CustomerService) { }
  async addSale(obj: addSaleDTO) {
    try {
      let sale_id = '';

      let createDateSales = await Sale.find({
        creation_date: format(toZonedTime(new Date(), PAKISTAN_TZ), 'dd-MM-yyyy', { timeZone: PAKISTAN_TZ }),
      });

      while (sale_id == '') {
        sale_id = this.generateRandomCode();
        let checkExist = await Sale.findOne({ sale_id });
        if (checkExist) {
          sale_id = '';
        }
      }

      let saleToAdd: salesInterface = {
        _id: `${sale_id}_${new Date().getTime()}`,
        sale_id: sale_id ? sale_id : '',
        sale_details: obj.sale_details ? obj.sale_details : [],
        customer_name: obj.customer_name ? obj.customer_name : '',
        customer_id: obj.customer_id ? obj.customer_id : '',
        discount: obj.discount ? obj.discount : 0,
        sub_total: obj.sub_total ? obj.sub_total : 0,
        total: obj.total ? obj.total : 0,
        vehicle_number: obj.vehicle_number ? obj.vehicle_number?.trim() : '',
        details: obj.details ? obj.details?.trim() : '',
        payment_method: obj.payment_method ? obj.payment_method : '',
        creation_time: new Date().getTime(),
        creation_date: format(toZonedTime(new Date(), PAKISTAN_TZ), 'dd-MM-yyyy', { timeZone: PAKISTAN_TZ }),
        created_by: obj.email ? obj.email?.trim()?.toLowerCase() : '',
        status: true,
        customer_type: obj.customer_type ? obj.customer_type : '',
        received_amount: obj.received_amount ? obj.received_amount : 0,
        remaining_amount: obj.remaining_amount ? obj.remaining_amount : 0,
        invoice_no: createDateSales.length + 1,
        invoice_by: obj.invoice_by ? obj.invoice_by : '',
        vehicle_person_name: obj.vehicle_person_name
          ? obj.vehicle_person_name
          : '',
        address: obj.address ? obj.address : '',
      };

      let response = await Sale.create(saleToAdd);
      if (obj.remaining_amount != 0) {
        await this.customerService.updateCustomerBalance({
          email: obj.email,
          _id: obj.customer_id,
          bill_amount: obj.remaining_amount,
          type: 'Bill',
          invoice_id: sale_id,
        });
      }
      if (response) {
        console.log(
          'Sale add success  ',
          saleToAdd._id,
          ' ',
          new Date().toString().slice(0, 24),
        );
        let temp: any = obj.sale_details;

        for (let i = 0; i < temp.length; i++) {
          let find = await Inventory.findOne({
            product_code: temp[i]?.code,
            product_of_id: temp[i].product_of_id,
          });
          if (find) {
            let updatedQuantity = +find.quantity - +temp[i].qty;

            await Inventory.findByIdAndUpdate(
              { _id: find._id },
              { quantity: updatedQuantity },
            );
          }
        }
        let cusomerData = await Customer.findOne({ _id: obj.customer_id });

        return {
          status: 200,
          message: 'Sale Added successfully',
          data: { print: saleToAdd, customer: cusomerData ? cusomerData : {} },
        };
      } else {
        return {
          status: 400,
          message: response['message'],
        };
      }
    } catch (err) {
      console.log('Error While Adding Sale ' + err.message);
      return { status: 500, message: err.message };
    }
  }

  async deleteSale(obj: deleteSaleDTO) {
    try {
      const saleDetails = await Sale.findOne({ sale_id: obj.sale_id });

      if (saleDetails.remaining_amount != 0) {
        await this.customerService.updateCustomerBalance({
          email: obj.email,
          _id: saleDetails.customer_id,
          bill_amount: -saleDetails.remaining_amount,
          type: 'Delete Bill',
          invoice_id: saleDetails.sale_id,
        });
      }

      console.log(
        'Sale Delete success  ',
        obj.sale_id,
        ' ',
        new Date().toString().slice(0, 24),
      );
      let temp: any = saleDetails.sale_details;

      for (let i = 0; i < temp.length; i++) {
        let find = await Inventory.findOne({
          product_code: temp[i]?.code,
          product_of_id: temp[i].product_of_id,
        });
        if (find) {
          let updatedQuantity = +find.quantity + +temp[i].qty;

          await Inventory.findByIdAndUpdate(
            { _id: find._id },
            { quantity: updatedQuantity },
          );
        }
      }

      await Sale.findOneAndUpdate({ sale_id: obj.sale_id }, { status: false });

      return {
        status: 200,
        message: 'Sale Deleted successfully',
      };
    } catch (err) {
      console.log('Error While Adding Sale ' + err.message);
      return { status: 500, message: err.message };
    }
  }

  async getAllSalePagination(obj: getSalePaginateDTO) {
    try {
      let query = Sale.aggregate();

      let options = paginationOptions(
        obj.page_number,
        obj.page_size,
        'creation_time',
        'desc',
      );

      if (obj.sale_id?.trim()) {
        query = Sale.aggregate([
          {
            $match: {
              sale_id: { $regex: new RegExp(obj.sale_id, 'i') },
              status: true,
            },
          },
        ]);
      } else {
        query = Sale.aggregate([{ $match: { status: true } }]);
      }

      let allItems = await Sale.aggregatePaginate(query, options.options);

      if (allItems.docs.length > 0) {
        return {
          status: 200,
          totalRecords: allItems.totalDocs,
          data: allItems.docs,
          totalPages: allItems.totalPages,
        };
      } else {
        return {
          status: 404,
          totalRecords: 0,
          data: [],
          totalPages: 0,
          message: 'Record Not Found',
        };
      }
    } catch (err) {
      console.log('Error While getting Sale ' + err.message);
      return { status: 500, message: err.message };
    }
  }

  generateRandomCode() {
    const characters = '0123456789';

    let code = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  }
}
