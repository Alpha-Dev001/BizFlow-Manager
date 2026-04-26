import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { CurrentUser } from '../../common/decorators/current-user-decorator'


@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  create(@CurrentUser() user,@Body() dto:CreateMeetingDto){
    return this.meetingsService.createMeeting(user.companyId,user.id,dto);
  }

  @Get()
  getAll(@CurrentUser() user){
    return this.meetingsService.findAllMeetings(user.companyId,user.id);
  }

  @Get(':id')
  getOne(@CurrentUser() user, @Param('meetingId') meetingId:string) {
    return this.meetingsService.findOneMeeting(user.companyId,user.id,meetingId);
  }

  @Patch(':id') 
  update(@CurrentUser() user,@Param('meetingId') meetingId:string,@Body() dto:UpdateMeetingDto) {
    return this.meetingsService.updateMeeting(user.companyId,meetingId,dto);
  }

  @Delete(':id')
  delete(@CurrentUser() user,@Param('meetingId') meetingId:string){
    return this.meetingsService.deleteMeeting(user.companyId,meetingId);
  }
  
}
