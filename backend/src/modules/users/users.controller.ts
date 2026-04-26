import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import { UpdateEmailDto } from './dto/update-email.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';


@Controller('employees')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@CurrentUser() user,@Body()dto:CreateUserDto ){
    return this.usersService.createEmployee(user.companyId,dto);
  }

  @Get()
  getAll(@CurrentUser() user){
    return this.usersService.getAllEmployees(user.companyId);
  }

  @Get(':id')
  get(@CurrentUser() user,@Param('id') id:string){
    return this.usersService.getOneEmployee(user.companyId,id);
  }

  @Patch(':id')
  update(@CurrentUser() user,@Param('id') id:string,@Body() dto:UpdateUserDto ){
    return this.usersService.updateEmployee(id,dto,user.companyId);
  }

  @Delete(':id')
  delete(@CurrentUser() user,@Param('id') id:string){
    return this.usersService.deleteEmployee(user.companyId,id);
  }

   @Patch(':id/email')
  requestEmailUpdate(
    @CurrentUser() user,
    @Param('id') id: string,
    @Body() dto: UpdateEmailDto,
  ) {
    return this.usersService.requestEmailChange(user.companyId, id, dto);
  }

  // ── VERIFY EMAIL UPDATE - verifies OTP & updates email ───
  @Post(':id/verify-email')
  verifyEmailUpdate(
    @CurrentUser() user,
    @Param('id') id: string,
    @Body() dto: VerifyEmailDto,
  ) {
    return this.usersService.verifyEmailUpdate(user.companyId, id, dto);
  }
  
}
