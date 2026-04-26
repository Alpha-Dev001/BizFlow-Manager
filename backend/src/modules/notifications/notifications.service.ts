import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from '../../prisma/prisma.service'
import { NotificationsGateway } from './notifications.gateway';
import { asyncWrapProviders } from 'async_hooks';


@Injectable()
export class NotificationsService {
  
    constructor(private prisma:PrismaService,private notificationGateway:NotificationsGateway){}

    //--create notification

    async createNotification(dto:CreateNotificationDto) {
        const notification = await this.prisma.notification.create({
            data:{
               userId:dto.userId,
               message:dto.message,
               type:dto.type as any 
            }
        });

        this.notificationGateway.sendNotificationToUser(
            dto.userId,notification
        );

        return notification;
    }

    async notifyCompany(companyId:string,message:string,type:string) {
        const users = await this.prisma.user.findMany({
            where:{companyId},
            select:{id:true}
        });

        
        const notifications = Promise.all(
            users.map((user) => {
                this.prisma.notification.create({
                    data:{
                        userId:user.id,
                        message,
                        type:type as any
                    }
                });
            })
        );
        
        this.notificationGateway.sendNotificationToCompany(users.map(u => u.id),{message,type});

        return notifications;
    }

    async getMyNotifications(userId:string) {
        return this.prisma.notification.findMany({
            where:{userId},
            orderBy:{createAt:'desc'}
        });
        
    }

    async markAsRead(userId:string, notificationId:string){
        return this.prisma.notification.update({
            where:{id:notificationId},
            data:{isRead:true}
        });
    }

    async markAsAllRead(userId:string){
        await this.prisma.notification.updateMany({
            where:{userId,isRead:false},
            data:{isRead:true}
        });
        return {message:'All notifications marked as read.'}
    }
}
