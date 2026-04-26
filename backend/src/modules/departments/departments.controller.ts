import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';


@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  
  @Post('create-depart')
   createDepartment(@CurrentUser() user, @Body() dto:CreateDepartmentDto){
      return  this.departmentsService.createDepartment(user.companyId,dto);
  }

 @Get()
   getAllDepartments(@CurrentUser() user){
    return  this.departmentsService.getAllDepartments(user.companyId);
  }

@Get(':id')
   getDepartment(@CurrentUser() userInfo, @Param('id') id:string){
    return this.departmentsService.getDepartment(userInfo.companyId,id);
}

@Patch(':id')
   updateDepartment(@CurrentUser() userInfo, @Param('id') id:string, @Body() dto:UpdateDepartmentDto){
    return this.departmentsService.updateDepartment(userInfo.companyId,id,dto);
  }

  @Delete(':id')
   deleteDepartment(@CurrentUser() userInfo, @Param('id') id:string){
    return this.departmentsService.deleteDepartment(userInfo.companyId,id);
  }
  
}
