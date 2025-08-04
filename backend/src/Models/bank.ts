import mongoose from 'mongoose';
import { model, Schema, Model, Document } from 'mongoose';
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

export class bankInterface {
  _id:string='';
  bank_name:string='';
  account_title:string='';
  account_no:string='';
  creation_time:number=0;
  creation_date:string='';
  created_by:string="";
  status:boolean =true;
}
const bankSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  creation_time: {
    type: Number
  },

  bank_name: {
    type: String,
    required: true,
    
  },

  account_title: {
    type: String
  },

  creation_date: {
    type: String
  },

  account_no: {
    type: String
  },

  status:{
   type:Boolean 
  },
  created_by:{
    type:String
  }
});

bankSchema.plugin(aggregatePaginate);
export const Bank = model('bank', bankSchema);

module.exports = { Bank, bankInterface };
