import mongoose from 'mongoose';
import { model, Schema, Model, Document } from 'mongoose';
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

export class customerInterface {
  _id:string='';
  name:string='';
  profile_picture:string='';
  cnic:string='';
  contact_no:string = '';
  creation_time:number=0;
  creation_date:string='';
  created_by:string="";
  status:boolean =true;
  balance:number=0;
  payment_history:string[]=[];
}


const subSchema = new mongoose.Schema({
  type: {
    type: String,
   
  },
  date: {
    type: String,
    
  },
  amount:{
    type:Number
  },
  time:{
    type:Number
  },
  invoice_id:{
    type:String
  
  },
  balance:{
    type:Number
  },
  email:{
    type:String
  
  }

}, { _id: false });
const customerSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  creation_time: {
    type: Number
  },

  balance: {
    type: Number
  },
  payment_history:{
    type: [subSchema]      
  },

  name: {
    type: String,
    required: true,
    
  },

  profile_picture: {
    type: String
  },

  creation_date: {
    type: String
  },

  cnic: {
    type: String
  },

  contact_no: {
    type: String
  },
  status:{
   type:Boolean 
  },
  created_by:{
    type:String
  }
});

customerSchema.plugin(aggregatePaginate);
export const Customer = model('customer', customerSchema);

module.exports = { Customer, customerInterface };
