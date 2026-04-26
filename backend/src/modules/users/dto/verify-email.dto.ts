// src/modules/employees/dto/verify-email.dto.ts
import { IsString, Length } from 'class-validator';

export class VerifyEmailDto {
  @IsString()
  @Length(4, 4, { message: 'OTP must be exactly 4 digits' })
  otp: string;
}