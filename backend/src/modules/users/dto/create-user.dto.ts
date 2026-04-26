import {IsEmail, IsString, IsOptional, IsNumber, MinLength  } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name:string;

    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    phoneNumber:string;

    @IsNumber()
    @IsOptional()
    salary?:number;

    @IsOptional()
    @IsString()
    departmentId?: string;

}
