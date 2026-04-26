import { Controller,UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterCompanyDto,RegisterOwnerDto,LoginDto } from './dto'
import { Public } from '../../common/decorators/public.decorator'
import { CurrentUser } from '../../common/decorators/current-user-decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Post,Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register/owner')
  async registerOwner(@Body() user:RegisterOwnerDto){
    return this.authService.registerOwner(user);
  }


  @UseGuards(JwtAuthGuard)
  @Post('register/company')
   async registerCompany(@CurrentUser() user,@Body() company:RegisterCompanyDto){
    return this.authService.RegisterCompany(user.id,company);
  }

  @Public()
  @UseGuards()
  @Post('login')
   async login(@Body() loginCreds:LoginDto ) {
    return this.authService.login(loginCreds);
   }
  
}
