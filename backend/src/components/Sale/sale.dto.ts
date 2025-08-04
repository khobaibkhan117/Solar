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
  isNotEmpty,
} from 'class-validator';

export class addSaleDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsArray()
  sale_details: string[];

  @IsNotEmpty()
  @IsString()
  customer_name: string;

  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @IsNotEmpty()
  @IsNumber()
  sub_total: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsOptional()
  @IsString()
  vehicle_number: string;

  @IsOptional()
  @IsString()
  details: string;

  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @IsNotEmpty()
  @IsString()
  customer_type: string;

  @IsOptional()
  @IsNumber()
  remaining_amount: number;

  @IsOptional()
  @IsNumber()
  received_amount: number;

  @IsNotEmpty()
  @IsString()
  invoice_by: string;

  @IsNotEmpty()
  @IsString()
  vehicle_person_name: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}

export class getSalePaginateDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  page_size: string;

  @IsNotEmpty()
  @IsString()
  page_number: string;

  @IsOptional()
  @IsString()
  product_of_id: string;

  @IsOptional()
  @IsString()
  sale_id: string;
}

export class deleteSaleDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  sale_id: string;
}
