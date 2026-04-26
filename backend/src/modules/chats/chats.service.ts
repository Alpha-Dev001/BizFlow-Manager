import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendMessaageDto } from './dto/send-message.dto';



@Injectable()
export class ChatsService {

    constructor(private prisma: PrismaService) {}

    //create channel

    async createChannel(companyId:string,name:string){
        const channel = await this.prisma.channel.create({
            data:{
                name,
                companyId
            }
        });

        return {
            message:'Channel created successfully',
            channel
        }
    }

    //getall channels

    async getAllChannels(companyId:string){
        const channels = this.prisma.channel.findMany({
            where:{companyId},
            include:{
                _count:{
                    select:{
                        messages:true
                    }
                }
            }
        });

        return channels;
    }

    async getChannelMessages(channelId:string,companyId:string){
        
        const channel = await this.prisma.channel.findUnique({
            where:{id:channelId},
        });

        if(!channel){
            throw new NotFoundException('Channel not found');
        }

        if(channel.companyId !== companyId){
            throw new ForbiddenException('You are not authorized to access this channel');
        }

        const messages = await this.prisma.message.findMany({
            where:{channelId},
            include:{
                sender:true
            },
            orderBy:{
                createdAt:'asc'
            }
        });
        
        return messages;

    }

    async saveMessage(senderId:string, dto:SendMessaageDto){

            const channel = await this.prisma.channel.findUnique({
                where:{id:dto.channelId}
            });

            if(!channel){
                throw new NotFoundException('Channel not found');
            }


        const message = await this.prisma.message.create({
            data:{
                senderId,
                channelId:dto.channelId,
                content:dto.content
            }
        });

        return {
            message:'Message sent successfully',
            data:message
        }
    }

    async validateChannelAccess(companyId:string,channelId:string){
        const channel = await this.prisma.channel.findUnique({
            where:{
                id:channelId,
                companyId
            }
        });
        
        if(!channel){
            throw new NotFoundException('Channel not found');
        }

        if(channel.companyId !== companyId){
            throw new ForbiddenException('You are not authorized to access this channel');
        }
        
        return channel;
    }
}