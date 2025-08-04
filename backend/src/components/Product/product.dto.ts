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
    isNotEmpty
  } from 'class-validator';


  export class addProductDTO{

    @IsOptional()
    @IsEmail()
    email:string

    @IsOptional()
    @IsString()
    name:string


    @IsOptional()
    @IsString()
    code:string

    @IsOptional()
    @IsString()
    company_name:string

    @IsOptional()
    @IsString()
    description:string

    @IsOptional()
    @IsString()
    price:string

    @IsOptional()
    @IsString()
    cost:string

    @IsOptional()
    @IsString()
    alert:string

    @IsOptional()
    @IsString()
    picture:string

    @IsOptional()
    @IsString()
    watt:string





  }

  export class getProductDTO{
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

  export class getAllProductDTO{
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsOptional()
    @IsString()
    product_of_id:string


   

  }

  export class deleteProductDTO{
    @IsNotEmpty()
    @IsEmail()
    email:string


    @IsNotEmpty()
    @IsString()
    id:string

   

  }

  export class editProductDTO{

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    name:string

    
    @IsNotEmpty()
    @IsString()
    _id:string


    @IsOptional()
    @IsString()
    code:string

    @IsOptional()
    @IsString()
    company_name:string

    @IsOptional()
    @IsString()
    description:string

    @IsOptional()
    @IsString()
    price:string

    @IsOptional()
    @IsString()
    cost:string

    @IsOptional()
    @IsString()
    alert:string

    @IsOptional()
    @IsString()
    picture:string

    
    @IsOptional()
    @IsString()
    watt:string



  }