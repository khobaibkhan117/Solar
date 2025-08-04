import {
    Injectable,
    forwardRef,
    Inject,
    Scope,
    UseGuards,
} from '@nestjs/common';

import { format, toZonedTime } from 'date-fns-tz';
import * as process from 'process';
import { addExpenseDTO, addSiteManagementDTO, getAllSiteDTO, getSiteDTO, updateSiteManagementDTO } from './sitemanagement.dto';
import { SiteManagement, siteManagementInterface } from '../../Models/siteMangement';
import { paginationOptions } from 'src/helperFunction/PaginationOption';

const PAKISTAN_TZ = process.env.TZ || 'Asia/Karachi';

@Injectable({ scope: Scope.REQUEST })
export class SiteService {
    async addSite(obj: addSiteManagementDTO) {
        try {

            let siteToAdd: siteManagementInterface = {
                site_name: obj.site_name ? obj.site_name?.trim() : '',
                site_description: obj.site_description ? obj.site_description?.trim() : '',
                address: obj.address ? obj.address?.trim() : '',
                creation_time: new Date().getTime(),
                creation_date: format(toZonedTime(new Date(), PAKISTAN_TZ), 'dd-MM-yyyy', { timeZone: PAKISTAN_TZ }),
                created_by: obj.email,
                status: true,
                budget: obj.budget ? obj.budget : 0,
                assignee: [],
                contact_number: obj.contact_number ? obj.contact_number : '',
            };

            let response = await SiteManagement.create(siteToAdd);

            if (response) {
                console.log(
                    'Site add success  ',
                    siteToAdd.site_name,
                    ' ',
                    new Date().toString().slice(0, 24),
                );

                return {
                    status: 200,
                    message: 'Site Added successfully',
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

    async getAllSitePagination(obj: getSiteDTO) {
        try {
            let query = SiteManagement.aggregate();
            let cond: any = {}

            let options = paginationOptions(
                obj.page_number,
                obj.page_size,
                'creation_time',
                'desc',
            );
            if (obj.site_name?.trim()) {
                query = SiteManagement.aggregate([{ $match: { site_name: { $regex: new RegExp(obj.site_name, 'i') } } }]);
                cond.site_name = { $regex: new RegExp(obj.site_name, 'i') }


            }
            if (obj.assignee?.trim()) {
                query = SiteManagement.aggregate([{ $match: { assignee: { $in: obj.assignee } } }]);
                cond.assignee = { $in: obj.assignee?.split(',') }

                //console.log(obj.assignee)

            }


            query = SiteManagement.aggregate([{ $match: cond }]);








            let allItems = await SiteManagement.aggregatePaginate(query, options.options);

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
            console.log("Error While getting Site" + err.message)
            return { status: 500, message: err.message }
        }
    }
    async getAllSite(obj: getAllSiteDTO) {
        try {
            let allItems = await SiteManagement.find({});

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
            console.log("Error While getting Site " + err.message)
            return { status: 500, message: err.message }
        }
    }

    async updateSite(obj: updateSiteManagementDTO) {
        try {






            let response = await SiteManagement.findByIdAndUpdate({ _id: obj._id }, obj);

            if (response) {
                console.log(
                    'Site update successfully  ',
                    obj._id,
                    ' ',
                    new Date().toString().slice(0, 24),

                );

                return {
                    status: 200,
                    message: 'Site update successfully',

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
            console.log("Error While Updating Site" + err.message)
            return { status: 500, message: err.message }
        }
    }

    async addExpense(obj: addExpenseDTO) {
        try {


            let response = await SiteManagement.findByIdAndUpdate({ _id: obj._id }, { $push: { expense: obj.expense } });

            if (response) {
                console.log(
                    'Expense Add successfully  ',
                    obj._id,
                    ' ',
                    new Date().toString().slice(0, 24),

                );

                return {
                    status: 200,
                    message: 'Expense Add successfully',

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
            console.log("Error While Updating Site" + err.message)
            return { status: 500, message: err.message }
        }
    }
}
