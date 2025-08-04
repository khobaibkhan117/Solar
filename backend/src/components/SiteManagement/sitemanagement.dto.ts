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
    IsObject,
} from 'class-validator';


export class addSiteManagementDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    site_name: string;

    @IsOptional()
    @IsString()
    site_description: string;

    @IsOptional()
    @IsString()
    contact_number: string;

    @IsOptional()
    @IsNumber()
    budget: number;


    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsArray()
    assignee: string[];


}

export class updateSiteManagementDTO {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    _id: string;

    @IsNotEmpty()
    @IsString()
    site_name: string;

    @IsOptional()
    @IsString()
    site_description: string;

    @IsOptional()
    @IsNumber()
    budget: number;


    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsArray()
    assignee: string[];

    @IsOptional()
    @IsArray()
    expense: string[];

}


export class addExpenseDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    _id: string;

    @IsNotEmpty()
    @IsObject()
    expense: string[];
}

export class getSiteDTO {
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
    site_name: string

    @IsOptional()
    @IsString()
    assignee: string




}

export class getAllSiteDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    site_name: string



}

