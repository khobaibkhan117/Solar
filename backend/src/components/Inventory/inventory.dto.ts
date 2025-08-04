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

export class AddInventoryDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  product_name: string

  @IsNotEmpty()
  @IsString()
  product_code: string

  @IsNotEmpty()
  @IsString()
  product_picture: string

  @IsNotEmpty()
  @IsString()
  product_of_name: string

  @IsNotEmpty()
  @IsString()
  product_of_id: string


  @IsNotEmpty()
  @IsNumber()
  quantity: number

  @IsOptional()
  @IsNumber()
  damage_quantity: number




}


export class EditInventoryDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  product_name: string

  @IsNotEmpty()
  @IsString()
  _id: string

  @IsNotEmpty()
  @IsString()
  product_code: string

  @IsNotEmpty()
  @IsString()
  product_picture: string

  @IsNotEmpty()
  @IsString()
  product_of_name: string

  @IsNotEmpty()
  @IsString()
  product_of_id: string


  @IsNotEmpty()
  @IsNumber()
  quantity: number



}


export class getInventorytDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string


  @IsNotEmpty()
  @IsString()
  page_size: string

  @IsNotEmpty()
  @IsString()
  page_number: string

  @IsOptional()
  @IsString()
  product_of_id: string

  @IsOptional()
  @IsString()
  product_name: string

  @IsOptional()
  @IsString()
  product_code: string

}

export class getInventoryReporttDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string


  @IsOptional()
  @IsString()
  product_of_id: string

  @IsOptional()
  @IsString()
  product_name: string

  @IsOptional()
  @IsString()
  product_code: string

}

export class getAllInventorytDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  product_of_id: string



}

export class updateInventoryQuantitytDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string


  @IsNotEmpty()
  @IsString()
  _id: string

  @IsOptional()
  @IsNumber()
  quantity: string

  @IsOptional()
  @IsNumber()
  damage_quantity: number

}

export class deleteInvenotryrDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string


  @IsNotEmpty()
  @IsString()
  _id: string



}
