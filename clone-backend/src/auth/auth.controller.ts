import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/login.dto';
import { AuthRegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    @Post('register')
    async register(@Body() registerDto: AuthRegisterDto) {
    //   return this.authService.register(registerDto);
    }
  
    @Post('login')
    async login(@Body() loginDto: AuthLoginDto) {
      return this.authService.login(loginDto);
    }
}
