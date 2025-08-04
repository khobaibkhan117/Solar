import {
    IsNotEmpty,
    IsEmail,
    Matches,
    IsString,
    IsOptional,
    IsLowercase,
    IsBoolean,
    IsArray,
    IsNumber
  } from 'class-validator';

  export class AddProductOfDTO{
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsOptional()
    @IsString()
    contact_no:string

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
   cnic:string

   @IsOptional()
   @IsString()
    profile_picture:string
}

export class getProductOfDTO{
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

export class getAllProductOfDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsOptional()
    @IsString()
    product_of_id:string



}

export class EditProductOfDTO{
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

  @IsNotEmpty()
  @IsString()
 cnic:string

 @IsOptional()
 @IsString()
  profile_picture:string
}


export class deleteProductOfDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string


  @IsNotEmpty()
  @IsString()
  _id:string

 

}


