 import { IsString,IsNumber,IsOptional } from 'class-validator'

 export class PaySalaryDto{

    @IsString()
    employeeId:string;

    @IsNumber()
    amount: number;

    @IsOptional()
    @IsString()
    currency?:string;
 }