// src/modules/employees/dto/update-email.dto.ts
import { IsEmail } from 'class-validator';

export class UpdateEmailDto {
  @IsEmail()
  newEmail: string;
}