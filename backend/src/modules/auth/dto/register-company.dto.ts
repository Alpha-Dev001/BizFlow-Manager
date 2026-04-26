import {IsString,IsEmail } from 'class-validator'

export class RegisterCompanyDto{
    @IsString()
    companyName: string;

    @IsEmail()
    companyEmail:string;

    @IsString()
    companyPhone:string;
}
