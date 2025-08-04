import mongoose from 'mongoose';
import { model, Schema, Model, Document } from 'mongoose';
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

export class ProductInterface {
  _id:string='';
  name:string='';
  code:string='';
  company_name:string='';
  price:string ='';
  cost:string = '';
  creation_time:number=0;
  creation_date:string='';
  status:boolean =true;
  alert:string='';
  created_by:string='';
  picture:string='';
  description:string='';
  watt:string=""

}
const productSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  creation_time: {
    type: Number
  },

  name: {
    type: String,
    required: true,
    
  },

  picture: {
    type: String
  },
  created_by: {
    type: String
  },
  watt: {
    type: String
  },

  creation_date: {
    type: String
  },

  code: {
    type: String
  },

  company_name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: String
  },
  cost: {
    type: String
  },
  alert: {
    type: String
  },
  status:{
   type:Boolean 
  },
});

productSchema.plugin(aggregatePaginate);
export const Product = model('Product', productSchema);

module.exports = { Product, ProductInterface };
