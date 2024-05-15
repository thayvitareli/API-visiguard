import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { Public } from 'src/utils/decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  login(@Body() login: LoginDto) {
    console.log(login)
    return this.authService.login(login);
  }

  @Get()
  get() {
    return { message: 'teste' };
  }
}
