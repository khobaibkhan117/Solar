import mongoose from 'mongoose';
import { model, Schema, Model, Document } from 'mongoose';
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

export class salesInterface {
  _id:string='';
  sale_id:string='';
  sale_details:string[] =[];
  customer_name:string='';
  customer_id:string='';
  discount:number=0;
  sub_total:number=0;
  total:number=0;
  vehicle_number:string='';
  details:string='';
  payment_method:string='';
  creation_time:number=0;
  creation_date:string='';
  created_by:string="";
  status:boolean =true;
  customer_type:string="";
  received_amount:number=0;
  remaining_amount:number=0;
  invoice_no:number=0;
  invoice_by:string="";
  vehicle_person_name:string="";
  address:string="";
}
const salesSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  creation_time: {
    type: Number
  },

    sale_id: {
    type: String,
    required: true,
    
  },

 sale_details: {
    type: Array
  },

  creation_date: {
    type: String
  },

  customer_name: {
    type: String
  },

  customer_id: {
    type: String
  },
  status:{
   type:Boolean 
  },
  created_by:{
    type:String
  },
  discount:{
    type:Number
  },
  sub_total:{
    type:Number
  },
  total:{
    type:Number
  },
  invoice_no:{
    type:Number
  },
  remaining_amount:{
    type:Number
  },
  received_amount:{
    type:Number
  },
  vehicle_number:{
    type:String
  },
  details:{
    type:String
  },
  payment_method:{
    type:String
  },
  customer_type:{
    type:String
  },
  invoice_by:{
    type:String
  },
  vehicle_person_name:{
    type:String
  },
  address:{
    type:String
  }
});

salesSchema.plugin(aggregatePaginate);
export const Sale = model('sale', salesSchema);

module.exports = { Sale, salesInterface };
