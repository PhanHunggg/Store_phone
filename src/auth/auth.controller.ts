import { Body, Controller, Get, Param, Post, Put, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginInterface } from './interface/login';
import { SignUpInterface } from './interface/sign-up';
import { ForgotPasswordInterface } from './interface/forgot-password';
import { ResetPassInterface } from './interface/reset-pass';

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
  @Post("/sign-up")
  signUp(@Response() res: any, @Body() body: SignUpInterface) {
    return this.authService.signUp(res, body);
  }

  @Public()
  @Get('/forgot-password')
  forgotPassword(@Response() res: any, @Body() body: ForgotPasswordInterface) {
    return this.authService.forgotPassword(res, body);
  }

  @Public()
  @Put('/reset-password/:token')
  resetPass(@Response() res: any,@Param('token') token: string, @Body() body: ResetPassInterface) {
    return this.authService.resetPass(res, token, body);
  }


}
