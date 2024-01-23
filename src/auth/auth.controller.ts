import { Body, Controller, Get, Param, Post, Put, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginInterface } from './interface/login';
import { SignUpReqInterface } from './interface/sign-up';
import { ForgotPasswordInterface } from './interface/forgot-password';
import { ResetPassInterface } from './interface/reset-pass';
import { RtGuards } from 'src/common/guards/rt.guards';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { refreshTokensInterface } from './interface/refresh-token';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Get('/profile')
  profile(@GetCurrentUserId() userId: number, @Response() res: Response): Promise<void> {
      return this.authService.profile(res, userId);
  }

  @Public()
  @Post("/login")
  login(@Response() res: any, @Body() body: LoginInterface) {
    return this.authService.login(res, body);
  }

  @Public()
  @Post("/admin-login")
  loginAdmin(@Response() res: any, @Body() body: LoginInterface) {
    return this.authService.loginAdmin(res, body);
  }

  @Public()
  @Post("/sign-up")
  signUp(@Response() res: any, @Body() body: SignUpReqInterface) {
    return this.authService.signUp(res, body);
  }

  @Public()
  @Post('/forgot-password')
  forgotPassword(@Response() res: any, @Body() body: ForgotPasswordInterface) {
    return this.authService.forgotPassword(res, body);
  }


  @Public()
  @Post('/refresh-token')
  refreshToken(@Response() res: Response, @Body() body: refreshTokensInterface) {
    return this.authService.refreshToken(res, body);
  }

  @Public()
  @Put('/reset-password/:token')
  resetPass(@Response() res: any, @Param('token') token: string, @Body() body: ResetPassInterface) {
    return this.authService.resetPass(res, token, body);
  }

  @Public()
  @Put('/verify-email/:token')
  verifyEmail(@Response() res: any, @Param('token') token: string) {
    return this.authService.verifyEmail(res, token);
  }

}
