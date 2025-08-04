import {
    Injectable,
    forwardRef,
    Inject,
    Scope,
    UseGuards
} from '@nestjs/common';
import { paginationOptions } from '../../helperFunction/PaginationOption';
import { bankInterface, Bank } from '../../Models/bank';
import { format, toZonedTime } from 'date-fns-tz';
import * as process from 'process';
import { AddBankDTO, EditBankDTO, deleteBankDTO, getAllBankDTO, getBanktDTO } from './bank.dto';

const PAKISTAN_TZ = process.env.TZ || 'Asia/Karachi';

@Injectable({ scope: Scope.REQUEST })
export class BankService {

    async addBank(obj: AddBankDTO) {
        try {


            let checkExist = await Bank.findOne({ account_no: obj.account_no?.trim() })
            if (checkExist) {
                return {
                    status: 400,
                    message: 'User Email Already Exist',

                };
            }




            let bankToAdd: bankInterface = {
                _id: `${new Date().getTime()}`,

                creation_time: new Date().getTime(),
                creation_date: format(toZonedTime(new Date(), PAKISTAN_TZ), 'dd-MM-yyyy', { timeZone: PAKISTAN_TZ }),
                status: true,
                created_by: obj.email ? obj.email?.trim()?.toLowerCase() : "",
                bank_name: obj.bank_name ? obj.bank_name : '',
                account_title: obj.account_title ? obj.account_title : '',
                account_no: obj.account_no ? obj.account_no : ''
            };


            let response = await Bank.create(bankToAdd);

            if (response) {
                console.log(
                    'Bank add success  ',
                    bankToAdd._id,
                    ' ',
                    new Date().toString().slice(0, 24),

                );

                return {
                    status: 200,
                    message: 'Bank Added successfully',

                };
            }
            else {
                return {
                    status: 400,
                    message: response['message']
                }
            }

        }
        catch (err) {
            console.log("Error While Adding Bank " + err.message)
            return { status: 500, message: err.message }
        }
    }

    async getAllBankPagination(obj: getBanktDTO) {
        try {
            let query = Bank.aggregate();

            let options = paginationOptions(
                obj.page_number,
                obj.page_size,
                'creation_time',
                'desc',
            );
            if (obj.account_title?.trim()) {
                query = Bank.aggregate([{ $match: { account_title: { $regex: new RegExp(obj.account_title?.trim(), 'i') } } }]);

            } else {



                query = Bank.aggregate([{ $match: {} }]);
            }


            let allItems = await Bank.aggregatePaginate(query, options.options);

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


        }
        catch (err) {
            console.log("Error While getting Bank " + err.message)
            return { status: 500, message: err.message }
        }
    }
    async getAllBank(obj: getAllBankDTO) {
        try {
            let allItems = await Bank.find({});

            if (allItems.length > 0) {
                return {
                    status: 200,
                    data: allItems,

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


        }
        catch (err) {
            console.log("Error While getting Bank " + err.message)
            return { status: 500, message: err.message }
        }
    }

    async updateBank(obj: EditBankDTO) {
        try {




            let bankToUpdate = {

                bankname: obj.bank_name ? obj.bank_name?.trim() : '',

                account_title: obj.account_title ? obj.account_title?.trim() : '',
                account_no: obj.account_no ? obj.account_no?.trim() : '',
                status: true,

            };


            let response = await Bank.findByIdAndUpdate({ _id: obj._id }, bankToUpdate);

            if (response) {
                console.log(
                    'Bank update success  ',
                    obj._id,
                    ' ',
                    new Date().toString().slice(0, 24),

                );

                return {
                    status: 200,
                    message: 'Bank Update successfully',

                };
            }
            else {
                return {
                    status: 400,
                    message: response['message']
                }
            }

        }
        catch (err) {
            console.log("Error While Updating Bank " + err.message)
            return { status: 500, message: err.message }
        }
    }


    async deleteBank(obj: deleteBankDTO) {
        try {
            await Bank.findOneAndDelete({ _id: obj._id })



            return { status: 200, message: "Bank Successfully Deleted" }

        } catch (err) {
            console.log("Error While Deleting Bank " + err.message)
            return { status: 500, message: err.message }

        }
    }






}