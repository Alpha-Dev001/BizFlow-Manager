import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaySalaryDto } from './dto/pay-salary.dto';
import { PaymentWebhook } from './payments.webhook';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
    private stripe:Stripe;

  constructor(private prisma:PrismaService,private paymentsWebhook: PaymentWebhook){
    const stripeSecret = process.env.STRIPE_SECRET_KEY;

    if(!stripeSecret) throw new NotFoundException('The stripe secret key field is empty or null.');


    this.stripe = new Stripe(stripeSecret,{
        apiVersion:'2023-10-16'
    }
        
)}

async paySalary(companyId:string,dto:PaySalaryDto){
    const employee = await this.prisma.employee.findUnique({
        where:{id:dto.employeeId}
    });

    if(!employee) throw new NotFoundException('Employee not found.');

    if(employee.companyId !== companyId) throw new ForbiddenException('Access denied Employee does not belong to your company.');

    const payroll = await this.prisma.payroll.create({
        data: {
            employeeId:dto.employeeId,
            amount:dto.amount,
            currency:dto.currency || 'RWF',
            status:'Pending',
            paymentDate:new Date(),
        }
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(dto.amount * 100),
        currency:dto.currency || 'RWF',
        metadata: {
            payrollId: payroll.id,
            employeeId:dto.employeeId,
            companyId,
            type: 'Salary',
        }
    });

    await this.prisma.payroll.update({
        where:{id:payroll.id},
        data:{status:'Processing'}
    });

    return{
        message:'Payment initiated successfully',
        clientSecret:paymentIntent.client_secret,
        payroll:{
            id:payroll.id,
            amount:payroll.amount,
            currency:payroll.currency,
            status:'Processing'
        }
    }

}

async getHistory(companyId:string){
    return this.prisma.payroll.findMany({
        where:{employee : {companyId}},
        include:{
            employee: {
                select:{
                    id:true,
                    name:true,
                    email:true,
                }
            }
        },
        orderBy: {createdAt:'desc'}

    });

    
}

async handleWebhook(signature:string,rawBody:Buffer){
    return this.paymentsWebhook.handleWebhook(signature,rawBody);
}

async getEmployeeHistory(companyId:string,employeeId:string) {
    const employee = await this.prisma.employee.findUnique({
        where:{id:employeeId}
    });

    if(!employee) throw new NotFoundException('Employee not found');

    if(employee.companyId !== companyId) throw new ForbiddenException('Access Denied');

    const employeeHistroy = await this.prisma.payroll.findMany({
        where:{employeeId:employeeId},
        orderBy:{ createdAt:'desc'}
    });
}


}
