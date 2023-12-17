import { Body, Controller, Get, Post, Put, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginInterface } from './interface/login';
import { SignUpInterface } from './interface/sign-up';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post("/login")
  login(@Response() res: any, @Body() body: LoginInterface) {
    return this.authService.login(res, body);
  }

  @Public()
  @Put("/update-password")
  updatePassword(@Response() res: any, @Body() body: LoginInterface) {
    return this.authService.updatePassword(res, body);
  }

  @Public()
  @Post("/sign-up")
  signUp(@Response() res: any, @Body() body: SignUpInterface) {
    return this.authService.signUp(res, body);
  }

}
