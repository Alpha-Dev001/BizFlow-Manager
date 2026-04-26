import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentWebhook } from './payments.webhook'
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { NotificationsService } from '../notifications/notifications.service'

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService,PaymentWebhook,NotificationsService,NotificationsGateway],
})
export class PaymentsModule {}
