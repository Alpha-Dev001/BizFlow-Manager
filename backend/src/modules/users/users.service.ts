import { Injectable,NotFoundException,ForbiddenException,ConflictException,BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailOtpService } from '../auth/email-otp.service';
import { VerifyOtpDto } from '../auth/dto/verify-otp.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { NotificationsService } from '../notifications/notifications.service';


@Injectable()
export class UsersService {
  
    constructor(private prisma:PrismaService,private emailOtpService:EmailOtpService, @Inject(CACHE_MANAGER) private cacheManager: Cache,private notificationsService:NotificationsService){}


    //--create Employee---

    async createEmployee(companyId:string,dto:CreateUserDto) {
        const existingEmployee = await this.prisma.employee.findUnique({
            where:{email:dto.email}
        });

        if(existingEmployee) {
            throw new ConflictException('Employee already exists.');
        }

        const hashedPassword = await bcrypt.hashPassword(dto.password,10);

        const newEmployee = await this.prisma.employee.create({
            data:{
                name:dto.name,
                email:dto.email,
                password:hashedPassword,
                phoneNumber:dto.phoneNumber,
                salary:dto.salary,
                companyId,
                departmentId:dto.departmentId,

            },
            include:{
                department:true
            }
        });

        await this.notificationsService.notifyCompany(
            companyId,
            `New employee added : ${dto.name}`,
            'EMPLOYEE'
            
        );

        const { password, ...employeeWithoutPassWord} = newEmployee;

        return {
            message:'Employee created successfully',
            employee:employeeWithoutPassWord
        };
    }


    // -- GetAll employees --

    async getAllEmployees(companyId:string){
        const employees = await this.prisma.employee.findMany({
            where:{companyId}
        });

        if(!employees) throw new NotFoundException('No employees were found.');

        return employees;
    }


    //-- GetOne employee--

    async getOneEmployee(companyId:string,employeeId:string){
        const employee = await this.prisma.employee.findUnique({
        where:{id:employeeId},
        select:{
            id:true,
            name:true,
            email:true,
            phoneNumber:true,
            salary:true,
            createdAt:true,
            department:{
                select:{
                    id:true,
                    name:true,
                },
            },
            payroll:{
                select:{
                    id:true,
                    amount:true,
                    currency:true,
                    paymentDate:true,
                },
                orderBy: {createdAt: 'desc'},
                take:3,
                
            }
        }
    });

    if(!employee) throw new NotFoundException('Employee not Found.');

    if (employee.department) {
      const employeeRecord = await this.prisma.employee.findUnique({
        where: { id: employeeId },
      });
      
      if (!employeeRecord || employeeRecord.companyId !== companyId) {
        throw new ForbiddenException('Access denied');
      }
    }

    return employee;
    }




    //--update employee --

    async updateEmployee(employeeId:string,dto:UpdateUserDto,companyId:string) {
          const employee = await this.prisma.employee.findUnique({
        where:{id:employeeId}
    });

    if(!employee) throw new NotFoundException('Employee not Found.');

     if (employee.companyId !== companyId) {
      throw new ForbiddenException('Access denied');
    }

    const { email, ...safeDto} = dto

    const updatedEmployee = await this.prisma.employee.update({
        where:{id:employeeId},
        data:{...safeDto},
    select:{
         id: true,
        name: true,
        email: true,
        phoneNumber: true,  
        salary: true,
        department: true,
        createdAt: true,
        }
    });

     return{
        message:'Failed to update user',
         employee: updatedEmployee
    };
}


async requestEmailChange(employeeId:string,companyId:string,dto:UpdateEmailDto){
    const employee = await this.prisma.employee.findUnique({
        where:{id:employeeId}
    });

    if(!employee) throw new NotFoundException('Employee not found');

    if(employee.companyId !== companyId) throw new ForbiddenException('Access denied');

   const exisitingEmail = await this.prisma.employee.findUnique({
    where:{email:dto.newEmail}
   });
   
   if(exisitingEmail) throw new ConflictException('Email already exists');

   await this.prisma.employee.update({
    where:{id:employeeId},
    data:{pendingEmail:dto.newEmail}
   });

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        await this.cacheManager.set(`email-changer:${employeeId}`, otp, 60000);

        await this.emailOtpService.sendOtp(dto.newEmail,otp,employee.name);

        return {
      message: 'OTP sent to new email. Please verify to complete update.',
    };
}

async verifyEmailUpdate(companyId:string,employeeId:string,dto:VerifyEmailDto){

    const employee = await this.prisma.employee.findUnique({
        where:{id:employeeId}
    });

    if(!employee) throw new NotFoundException('Employee not found');

    if(employee.companyId !== companyId) throw new ForbiddenException('Access denied');

    if(!employee.pendingEmail) throw new BadRequestException('No pending email update found');

    // Get OTP from cache
    const cachedOtp = await this.cacheManager.get<string>(
      `email-update:${employeeId}`,
    );

    if(!cachedOtp) {
      throw new BadRequestException('OTP has expired. Please request a new one');
    }

    if(cachedOtp !== dto.otp) {
      throw new ConflictException('Invalid OTP');
    }

    // Delete OTP from cache
    await this.cacheManager.del(`email-update:${employeeId}`);

    // Update email and clear pendingEmail
    const updated = await this.prisma.employee.update({
      where: { id: employeeId },
      data: {
        email: employee.pendingEmail,
        pendingEmail: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        salary: true,
        department: true,
        createdAt: true,
      },
    });

    return {
      message: 'Email updated successfully',
      employee: updated,
    };
}



    //-- delete employee--

    async deleteEmployee(companyId:string,employeeId:string){

        const employee = await this.prisma.employee.findUnique({
            where:{id:employeeId}
        });

        if(!employee) throw new NotFoundException('Employee not found');

        if(employee.companyId !== companyId) throw new ForbiddenException('Access Denied');

        const deletedEmployee = await this.prisma.employee.delete({
            where:{id:employeeId}
        });

        return {
            message:'Employee deleted successfully.'
        }
    }


}  

