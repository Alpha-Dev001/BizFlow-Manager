import { Controller, Get, Post, Body, Patch, Param} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { CurrentUser } from '../../common/decorators/current-user-decorator'


@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(@CurrentUser() user) {
   return this.notificationsService.getMyNotifications(user.id,);
  }

  @Patch(':id')
  markAsRead(@CurrentUser() user,@Param('notificationId') notificationId:string ){
    return this.notificationsService.markAsRead(user.id,notificationId); 
  }

  @Patch()
 markAllAsRead(@CurrentUser() user){
  return this.notificationsService.markAsAllRead(user.id);
 }

 
}
