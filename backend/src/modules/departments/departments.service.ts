import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from '../../prisma/prisma.service'



@Injectable()
export class DepartmentsService {
 
    constructor(private prisma:PrismaService){}

    //--create department--

    async createDepartment(companyId:string,dto:CreateDepartmentDto){
        const department = await this.prisma.department.create({
            data:{
                name:dto.name,
                companyId
            }
        });

        return{
            message:'Department created successfully.',
            department,
        };

    }

    async getAllDepartments(companyId:string){
        const departments = await this.prisma.department.findMany({
            where:{companyId},
            include:{
                _count:{
                    select:{
                        employees:true
                    }
                }
            }
        });

        if(!departments) throw new NotFoundException("You have not created any departments.");
        

         return {
            message:'Your departments',
            departments,
        }

    }


    async getDepartment(companyId:string,departmentId:string){

        const department = await this.prisma.department.findUnique({
            where:{id:departmentId},
            include:{
                employees:{
                    select:{
                        id:true,
                        name:true,
                        email:true,
                        phoneNumber:true,
                        salary:true
                    }
                }
            }
        });

        if(!department){
            throw new NotFoundException('Department not found');
        }

        if(department.companyId !== companyId){
            throw new ForbiddenException('Access Denied.');
        }

        return department;
    }



    //--update department --

    async updateDepartment(companyId:string,departmentId:string,dto:UpdateDepartmentDto){
        const department = await this.prisma.department.findUnique({
            where:{id:departmentId}
        })

        if(!department) throw new NotFoundException('Department not found.');

        if(department.companyId !== companyId){
            throw new ForbiddenException('Access denied');
        }
        
        const updatedDepartment = await this.prisma.department.update({
            where:{id:departmentId},
            data:{...dto}
        })

        return{
            message:'Department has been updated',
            department:updatedDepartment
        }
    }

    async deleteDepartment(companyId:string,departmentId:string){
        const department = await this.prisma.department.findUnique({
            where:{id:departmentId}
        });

        if(!department) throw new NotFoundException('Department not found.');

        if(department.companyId !== companyId){
            throw new ForbiddenException("Access Denied.");
        }

        
        await this.prisma.department.delete({
            where:{id:departmentId}
        });

        return{message:"Department has been deleted successfully."};

    
        
    }

    
    
}
