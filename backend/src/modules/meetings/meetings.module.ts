import { Module } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import { ChatsModule } from '../chats/chats.module';
import { NotificationsService } from '../notifications/notifications.service'
import { NotificationsGateway } from '../notifications/notifications.gateway';



@Module({
  imports:[ChatsModule],
  controllers: [MeetingsController],
  providers: [MeetingsService,NotificationsService, NotificationsGateway],
})
export class MeetingsModule {}
