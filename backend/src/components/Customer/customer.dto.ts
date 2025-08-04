import {
    IsNotEmpty,
    IsEmail,
    Matches,
    IsString,
    IsOptional,
    IsLowercase,
    IsBoolean,
    IsArray,
    IsNumber,
    isNumber
  } from 'class-validator';

  export class AddCustomerDTO{
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsOptional()
    @IsString()
    contact_no:string

    @IsNotEmpty()
    @IsString()
    name:string

    @IsOptional()
    @IsString()
   cnic:string

   @IsOptional()
   @IsString()
    profile_picture:string

    @IsOptional()
    @IsNumber()
    balance:number

    
}

export class getCustomertDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string


  @IsNotEmpty()
  @IsString()
  page_size:string

  @IsNotEmpty()
  @IsString()
  page_number:string

  @IsOptional()
    @IsString()
    product_of_id:string

    @IsOptional()
    @IsString()
    name:string

}

export class getAllCustomertDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsOptional()
    @IsString()
    product_of_id:string



}

export class EditCustomerDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsNotEmpty()
  @IsString()
  _id:string

  @IsOptional()
  @IsString()
  contact_no:string

  @IsNotEmpty()
  @IsString()
  name:string

  @IsOptional()
  @IsString()
  cnic:string

  @IsOptional()
  @IsString()
  profile_picture:string

  @IsOptional()
  @IsNumber()
  balance:number
}


export class deleteCustomerDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string


  @IsNotEmpty()
  @IsString()
  _id:string

 

}

export class getCustomertByIDDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsNotEmpty()
    @IsString()
    _id:string



}

export class updateBalanceDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsNotEmpty()
  @IsString()
  _id:string

  @IsNotEmpty()
  @IsNumber()
  bill_amount:number

  @IsNotEmpty()
  @IsString()
  type:string

  @IsOptional()
  @IsString()
  invoice_id:string





}


