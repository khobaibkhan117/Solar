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

  export class AddUserDTO{
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsEmail()
    user_email:string

    @IsOptional()
    @IsString()
    contact_no:string

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
   password:string

   @IsOptional()
   @IsString()
    profile_picture:string

    
    @IsNotEmpty()
    @IsString()
    features:string

    
    @IsOptional()
    @IsString()
   product_of:string


   @IsOptional()
    @IsString()
   product_of_id:string
}

export class SignInUserDTO{
  @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
   password:string


}

export class getUserPaginationDTO{
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
  product_of:string

    @IsOptional()
    @IsString()
    product_of_id:string

      
    @IsOptional()
    @IsString()
    name:string

}

export class getAllUserDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsOptional()
  @IsString()
  product_of:string

  @IsOptional()
    @IsString()
   product_of_id:string


 

}

export class updateUserStatusDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsNotEmpty()
  @IsString()
  _id:string

  @IsNotEmpty()
  @IsBoolean()
  status:boolean
}

export class updateUserDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsNotEmpty()
  @IsEmail()
  user_email:string

  @IsOptional()
  @IsString()
  contact_no:string

  @IsNotEmpty()
  @IsString()
  name:string

  @IsOptional()
  @IsString()
  profile_picture:string

  
  @IsNotEmpty()
  @IsString()
  features:string

  
  @IsOptional()
  @IsString()
  product_of:string


  @IsOptional()
  @IsString()
  product_of_id:string

  @IsNotEmpty()
  @IsString()
  _id : string
}

export class updateUserPasswordDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsNotEmpty()
  @IsString()
  password:string

  @IsNotEmpty()
  @IsString()
  new_password:boolean
}
export class updateUserBGImageDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsNotEmpty()
  @IsString()
  bg_image:string

}