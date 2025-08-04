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

  export class AddBankDTO{
    @IsNotEmpty()
    @IsEmail()
    email:string
    @IsNotEmpty()
    @IsString()
    bank_name:string

    @IsNotEmpty()
    @IsString()
   account_no:string

   @IsNotEmpty()
   @IsString()
    account_title:string
}

export class getBanktDTO{
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
    account_title:string

    

}

export class getAllBankDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsOptional()
    @IsString()
    product_of_id:string



}

export class EditBankDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsNotEmpty()
  @IsString()
  _id:string

  @IsNotEmpty()
  @IsString()
  account_no:string

  @IsNotEmpty()
  @IsString()
  bank_name:string

  @IsNotEmpty()
  @IsString()
 account_title:string

 
}


export class deleteBankDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string


  @IsNotEmpty()
  @IsString()
  _id:string

 

}


