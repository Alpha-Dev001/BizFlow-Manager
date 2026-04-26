import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailOtpService {
    private transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            }
        });
    }

    async sendOtp(email:string, otp:string, name:string){
        await this.transporter.sendMail({
            from:process.env.EMAIL_FROM,
            to:email,
            subject:'BrooksBridge - Your OTP Code',
            text:`Hello ${name},\n\nYour OTP code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nBest regards,\nThe BrooksBridge Team`
        })
    }
}

