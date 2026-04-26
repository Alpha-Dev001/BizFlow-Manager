import { Controller, Get, Post, Body, RawBodyRequest, Param, Headers,Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaySalaryDto } from './dto/pay-salary.dto'
import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

@Post('salary')
payEmployee(@CurrentUser() user,@Body() dto:PaySalaryDto){
  return this.paymentsService.paySalary(user.companyId,dto);
}

@Get('history')
getPayRollHistory(@CurrentUser() user){
  return this.paymentsService.getHistory(user.companyId);
}

@Get('history/:id')
getHistoryOfEmployee(@CurrentUser() user,@Param('employeeId') employeeId:string) {
  return this.paymentsService.getEmployeeHistory(user.companyId,employeeId);
}

@Public()
@Post('webhook')
handleWebhook(@Headers('stripe-signature') signature:string,@Req() req:RawBodyRequest<Request>){
  if (!req.rawBody) {
    throw new Error('Raw body is required for webhook processing');
  }
  return this.paymentsService.handleWebhook(signature,req.rawBody);
}
 
}
