import { IsString,IsEnum } from 'class-validator'

export class CreateNotificationDto {
    @IsString()
    userId:string
    
    @IsString()
    message:string
    
    @IsEnum(['MEETING', 'PAYMENT', 'EMPLOYEE', 'GENERAL'])
    type:string
}
