import { IsString,IsOptional } from 'class-validator';

export  class SendMessaageDto{
    @IsString()
    channelId:string;

    @IsString()
    content:string;

   @IsOptional()
  @IsString()
  meetingLink?: string;
  
  
}
