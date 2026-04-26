import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  controllers: [UsersController],
  providers: [
    { provide: UsersService, useClass: UsersService },
    { provide: NotificationsService, useClass: NotificationsService },
    { provide: NotificationsGateway, useClass: NotificationsGateway },
  ],
})
export class UsersModule {}
