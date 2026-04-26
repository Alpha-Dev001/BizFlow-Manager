import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { PrismaService } from '../../prisma/prisma.service'
import { ChatsService } from '../chats/chats.service'
import { NotificationsService } from '../notifications/notifications.service'

@Injectable()
export class MeetingsService {
  
    constructor(private prisma:PrismaService,private chatsService:ChatsService, private notificationsService:NotificationsService){}

    //--create meeting--

    async createMeeting(companyId:string,userId:string,dto:CreateMeetingDto){

        const meetingCreator = await this.prisma.user.findUnique({
            where:{id :userId}
        });

        if(!meetingCreator) throw new NotFoundException('You do not have an account.');

        if(meetingCreator.companyId !== companyId) throw new ForbiddenException('You are not authorized to create a meeting for this company.');


        const meeting = await this.prisma.meeting.create({
            data:{
                title:dto.title,
                link:dto.link,
                scheduledAt:dto.scheduledDate,
                departmentId:dto.departmentId,
                companyId
            }
        });

        await this.notificationsService.notifyCompany(
            companyId,
            `New meeting scheduled: ${dto.title} at/on ${dto.scheduledDate} `,
            'MEETING'
        )

        const channels = await this.chatsService.getAllChannels(companyId);

        const generalChannel = channels.find((c) => c.name === 'general');
        
        if(generalChannel){
            await this.chatsService.saveMessage(userId, {
                channelId:generalChannel.id,
                content:`New meeting scheduled : ${dto.title} on/at ${new Date (dto.scheduledDate)} 
                `,
                meetingLink:dto.link,
            })
        }

        return {
            message:'Created Meeting successfully.',
            meeting,
        }
    }


    async findAllMeetings(companyId:string,userId:string) {

        const user = await this.prisma.user.findUnique({
            where:{id:userId}
        });

        if(user?.companyId === null){
            throw new NotFoundException(`Dear ${user.name} please create a company.`);
        }

        const meetings = await this.prisma.meeting.findMany({
            where:{companyId}
        });

        
        return meetings;
        
    }

    async findOneMeeting(companyId:string,userId:string,meetingId:string){
       const user = await this.prisma.user.findUnique({
            where:{id:userId}
        });

        if(user?.companyId === null){
            throw new NotFoundException(`Dear ${user.name} please create a company.`);
        }
        
        const meeting = await this.prisma.meeting.findUnique({
            where:{id:meetingId}
        });

        if(!meeting) throw new NotFoundException('Meeting not found.');

        if(meeting.companyId !== companyId) throw new ForbiddenException("You are authorized to see this meeting's content");

        return meeting;
    }

    async updateMeeting(companyId:string,meetingId,dto:UpdateMeetingDto){
        const meeting = await this.prisma.meeting.findUnique({
            where:{id:meetingId}
        });

        if(!meeting) throw new NotFoundException("Meeting not found.");

        if(meeting.companyId !== companyId) throw new ForbiddenException("You are not authorized to edit this meeting's content");

        const updatedMeeting = await this.prisma.meeting.update({
            where:{id:meetingId},
            data:{...dto,
                scheduledAt:dto.scheduledDate ? new Date(dto.scheduledDate) : undefined
            }
        });

          return {
      message: 'Meeting updated successfully',
      meeting: updatedMeeting,
     };
    }

    async deleteMeeting(companyId:string,meetingId:string,){
        const meeting = await this.prisma.meeting.findUnique({
            where:{id:meetingId}
        });

        if(!meeting) throw new NotFoundException('Meeting not found');

         if (meeting.companyId !== companyId) {
             throw new ForbiddenException('You can not delete this meeting and its contents.');
             
         }

         await this.prisma.meeting.delete({
            where:{id:meetingId}
         });

         return {message:'Meeting has been deleted successfully.'}
    }
}
