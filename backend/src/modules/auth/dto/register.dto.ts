import { IsString,IsEmail,MinLength } from 'class-validator';


export class RegisterOwnerDto {
  @IsString()
  name: string;
  
  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;
  
  @IsString()
  @MinLength(8, {message: 'Password should have atleast 8 characters.'})
  password: string;
  
}