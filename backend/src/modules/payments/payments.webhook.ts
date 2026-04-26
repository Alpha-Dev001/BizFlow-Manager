import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';
import { NotificationsService } from 'src/modules/notifications/notifications.service';



@Injectable()
export class PaymentWebhook{
    private stripe: Stripe;

    constructor(private prisma:PrismaService,private notificationService:NotificationsService){
        const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
        if (!stripeSecretKey) {
            throw new Error('STRIPE_SECRET_KEY environment variable is not defined');
        }
        this.stripe = new Stripe(stripeSecretKey, {
            apiVersion: '2023-10-16'
        });
    }


    //---Handle webhook ---

    async handleWebhook(signature: string, rawBody: Buffer){
        let event: Stripe.Event;

        try{
            const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!webhookSecret) {
            throw new Error('STRIPE_WEBHOOK_SECRET environment variable is not defined');
        }
            event = this.stripe.webhooks.constructEvent(
                rawBody,
                signature,
                webhookSecret
            );
        }catch(err){
            throw new BadRequestException(`Webhook error: ${err.message}`);
        }

        switch(event.type){
            case 'payment_intent.succeeded':
                await this.onPaymentSuccess(event.data.object as Stripe.PaymentIntent);
                break;

            case 'payment_intent.payment_failed':
                await this.onPaymentFailed(event.data.object as Stripe.PaymentIntent);
                break;
                
                default:
                    console.log(`Unhandled event: ${event.type}`);
        }

        return {received: true}

    }


    private async onPaymentSuccess(PaymentIntent:Stripe.PaymentIntent){
        const { payrollId,employeeId } = PaymentIntent.metadata;

        await this.prisma.payroll.update({
            where:{id:payrollId},
            data:{
                status:'Payment successfull'
            }
        });

        await this.notificationService.createNotification({
            userId:employeeId,
            message:'Your salary has been processed successfully.',
            type:'PAYMENT'
        });

        console.log(`Payment succeeded for payroll: ${payrollId}`)
    }


private async onPaymentFailed(PaymentIntent:Stripe.PaymentIntent){
    const { payrollId,employeeId } = PaymentIntent.metadata;

    await this.prisma.payroll.update({
        where:{id:payrollId},
        data:{status: 'Payment failed.'}
    });

    await this.notificationService.createNotification({
        userId:employeeId,
            message:'Your salary has failed to be processed.Please contact your manager.',
            type:'PAYMENT'
    });

    console.log(`Payment failed for payroll: ${payrollId}`);
}

}
