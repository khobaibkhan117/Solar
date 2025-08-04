import mongoose from 'mongoose';
import { model, Schema, Model, Document, } from 'mongoose';
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

export class siteManagementInterface {
    site_name: string = '';
    site_description: string = '';
    address: string = '';
    creation_time: number = 0;
    creation_date: string = '';
    created_by: string = "";
    status: boolean = true;
    budget: number = 0;
    assignee: string[] = [];
    contact_number: string = '';

}
const siteManagementSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    creation_time: {
        type: Number
    },

    site_name: {
        type: String,
        required: true,

    },

    site_description: {
        type: String
    },
    contact_number: {
        type: String
    },

    address: {
        type: String
    },

    budget: {
        type: Number
    },

    assignee: [{
        type: String
    }],
    created_by: {
        type: String
    },
    expense: [],
    status: {
        type: Boolean
    }
});

siteManagementSchema.plugin(aggregatePaginate);
export const SiteManagement = model('site', siteManagementSchema);

module.exports = { SiteManagement, siteManagementInterface };
