import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CurrentUser } from '../../common/decorators/current-user-decorator'
import { channel } from 'node:diagnostics_channel';



@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

@Post('create-channel')
createChannel(@CurrentUser() user,name:string){
  return this.chatsService.createChannel(user.companyId,name);
}

@Get('channels')
getAllChannels(@CurrentUser() user){
  return this.chatsService.getLLChannels(user.companyId);
}

@Get('channels/:channelId/messages')
getMessages(@CurrentUser() user,@Param('channelId') channelId:string ){
  return this.chatsService.getChannelMessages(user.companyId,channelId);
}



}
