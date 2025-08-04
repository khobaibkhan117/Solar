import mongoose from 'mongoose';
import { model, Schema, Model, Document } from 'mongoose';
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

export class InventoryInterface {
  _id:string='';
  product_name:string='';
  product_code:string='';
  creation_time:number=0;
  creation_date:string='';
  status:boolean =true;
  created_by:string='';
  product_picture:string='';
  product_of_name:string='';
  product_of_id:string='';
  quantity:number=0;
  damage_quantity:number=0;

}
const inventorySchema = new mongoose.Schema({
  _id: {
    type: String
  },
  creation_time: {
    type: Number
  },
  quantity: {
    type: Number
  },

  damage_quantity: {
    type: Number
  },

  product_name: {
    type: String,
    required: true,
    
  },

  product_picture: {
    type: String
  },

  created_by: {
    type: String
  },
  

  creation_date: {
    type: String
  },

  product_code: {
    type: String
  },
  product_of_name: {
    type: String
  },
  product_of_id: {
    type: String
  },

  status:{
   type:Boolean 
  },
});

inventorySchema.plugin(aggregatePaginate);
export const Inventory = model('inventory', inventorySchema);

module.exports = { Inventory, InventoryInterface };
