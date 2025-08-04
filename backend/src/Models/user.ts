import mongoose from 'mongoose';
import { model, Schema, Model, Document } from 'mongoose';
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

export class userInterface {
  _id:string='';
  name:string='';
  profile_picture:string='';
  password:string='';
  email:string ='';
  contact_no:string = '';
  creation_time:number=0;
  creation_date:string='';
  status:boolean =true;
  features:string=''
  product_of:string=''
  product_of_id:string=''
  forget_otp:string=''
}
const userSchema = new mongoose.Schema({
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

  password: {
    type: String
  },

  email: {
    type: String
  },
  contact_no: {
    type: String
  },
  status:{
   type:Boolean 
  },
  features: {
    type: String
  },
  product_of: {
    type: String
  },
  product_of_id: {
    type: String
  },
  forget_otp: {
    type: String
  },
  bg_image: {
    type: String
  },
  
});

userSchema.plugin(aggregatePaginate);
export const User = model('user', userSchema);

module.exports = { User, userInterface };
