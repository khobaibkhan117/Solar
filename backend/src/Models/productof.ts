import mongoose from 'mongoose';
import { model, Schema, Model, Document } from 'mongoose';
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

export class productOfInterface {
  _id:string='';
  name:string='';
  profile_picture:string='';
  cnic:string='';
  contact_no:string = '';
  creation_time:number=0;
  creation_date:string='';
  created_by:string="";
  status:boolean =true;
}
const productOfSchema = new mongoose.Schema({
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

productOfSchema.plugin(aggregatePaginate);
export const ProductOf = model('productof', productOfSchema);

module.exports = { ProductOf, productOfSchema };
