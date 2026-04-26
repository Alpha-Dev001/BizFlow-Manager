import { IsString,IsDateString,IsOptional } from 'class-validator'


export class CreateMeetingDto{
    @IsString()
    title:string;

    @IsString()
    link:string;

    @IsDateString()
    scheduledDate:string;

    @IsOptional()
    @IsString()
    departmentId:string;


}
