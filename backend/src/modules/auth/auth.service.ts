    import {
         Injectable,
    ConflictException,
    UnauthorizedException,
    NotFoundException,
       Inject, 
       BadRequestException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterCompanyDto,RegisterOwnerDto,LoginDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

import { EmailOtpService } from './email-otp.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';


@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService,private jwt:JwtService,private emailOtpService:EmailOtpService,@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    //-- Creating owner/user --
    async registerOwner(user:RegisterOwnerDto) {
        const exsitingUser = await this.prisma.user.findUnique({
            where:{
                email:user.email
            }
        });

        if(exsitingUser){
            throw new ConflictException('Email is already in use.');
        }

        const hashedPassword = await bcrypt.hashPassword(user.password,10);


        const owner = await this.prisma.user.create({
            data: {
                name:user.name,
                email:user.email,
                password:hashedPassword,
                phoneNumber:user.phoneNumber,
            }
        });


        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        await this.cacheManager.set(`otp:${owner.email}`, otp, 60000);

        await this.emailOtpService.sendOtp(owner.email, otp,owner.name);

        return{
            message:"OTP sent successfully",
            email:owner.email,
        };

    }

     async verifyOtp(dto:VerifyOtpDto){
        
        const user = await this.prisma.user.findUnique({
            where:{
                email:dto.email
            }
        });

        if(!user){
            throw new BadRequestException('User not found');
        }

        if(user.isVerified){
            throw new BadRequestException('User already verified');
        }

        const cachedOtp = await this.cacheManager.get<string>(`otp:${dto.email}`);

        if(!cachedOtp){
            throw new  BadRequestException('OTP has expired. Please request a new one');
        }

        if(cachedOtp !== dto.otp){
             throw new BadRequestException('Invalid OTP');
        }

        await this.cacheManager.del(`otp:${dto.email}`);

        await this.prisma.user.update({
            where: { email: dto.email},
            data: { isVerified:true}
        });

        const tempToken = await this.signToken(user.id, user.email, true);

        return {
            message:'Email verified. Continue Company setup.',
            tempToken
        }
    }

    async resendOtp(email:string){
        const user = await this.prisma.user.findUnique({
            where:{ email }
        });

        if(!user){
            throw new BadRequestException('User not found');
        }
        if (user.isVerified) throw new BadRequestException('Email already verified');

            const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
            await this.cacheManager.set(`otp:${email}`, newOtp, 600000);
            await this.emailOtpService.sendOtp(email,newOtp,user.name);

             return { message: 'New OTP sent to your email' };
    }






    private async signToken(userId: string, email: string, isOnboarding: boolean): Promise<string> {
        const payload = {
            sub: userId,
            email: email,
            isOnboarding:isOnboarding
        };

        const options = {
            expiresIn: isOnboarding ? 3600 : 86400, // 1 hour or 24 hours in seconds
        }

        return this.jwt.signAsync(payload,options);
    }



    async RegisterCompany(userId:string,companyDto:RegisterCompanyDto){

        const user = await this.prisma.user.findUnique({
            where:{id:userId}
        })

        if(!user){
            throw new NotFoundException("User not found.")
        }

        if(user?.companyId){
            throw new ConflictException("User already has a company.")
        }

        const existingCompany = await this.prisma.company.findUnique({
            where:{companyEmail:companyDto.companyEmail}
        })


        if(existingCompany){
            throw new ConflictException('Company already exists, Company Email is already in use.');
        }

        const companyCreds = await this.prisma.company.create({
            data:{
                companyName:companyDto.companyName,
                companyEmail:companyDto.companyEmail,
                companyPhone:companyDto.companyPhone,
                user: {
                    connect:{ id : userId}
                }
            }
        });

        const legitToken = await this.signToken(userId, user.email, false);
        
        return {
            message: "Company registered successfully,Onboarding complete.",
            token: legitToken,
            companyId: companyCreds.id,
            companyName: companyCreds.companyName,
            companyEmail: companyCreds.companyEmail,
            companyPhone: companyCreds.companyPhone
        };


        //-- Login--

    }

   async login(loginDto:LoginDto){
        const user = await this.prisma.user.findUnique({
            where:{email:loginDto.email},
             include: { company: true },
        });

        if(!user){
           throw new UnauthorizedException('Invalid credentials');
        }
        

        const checkPassword = await bcrypt.compare(loginDto.password,user.password)

         if (!checkPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
      
    const token = await this.signToken(user.id, user.email, false);

    const { password, ...userWithOutPassword } = user

    return{
        message:'Login Successful',
        token,
        user:userWithOutPassword,
    }

   } 
    
}
