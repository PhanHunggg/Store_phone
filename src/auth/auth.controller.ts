import { Body, Controller, Get, HttpException, InternalServerErrorException, Param, Post, Put, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginInterface } from './interface/login';
import { SignUpInterfaceRes, SignUpReqInterface } from './interface/sign-up';
import { ForgotPasswordInterface } from './interface/forgot-password';
import { ResetPassInterface } from './interface/reset-pass';
import { RtGuards } from 'src/common/guards/rt.guards';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { refreshTokensInterface } from './interface/refresh-token';
import { Response } from 'express';
import { createCode, successCode } from 'src/response';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Get('/profile')
  async profile(@GetCurrentUserId() userId: number, @Res() res: Response): Promise<Response> {
    try {
      const user = await this.authService.profile(userId);

      return successCode(res, user)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Public()
  @Post("/login")
  async login(@Res() res: Response, @Body() body: LoginInterface): Promise<Response> {
    try {
      const user = await this.authService.login(res, body);

      return successCode(res, user)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Public()
  @Post("/admin-login")
  async loginAdmin(@Res() res: Response, @Body() body: LoginInterface): Promise<Response> {
    try {
      const user = await this.authService.loginAdmin(body);

      return successCode(res, user)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Public()
  @Post("/sign-up")
  async signUp(@Res() res: Response, @Body() body: SignUpReqInterface): Promise<Response> {
    try {
      const user = await this.authService.signUp(body);

      return createCode(res, user, "Đăng ký người dùng thành công!")
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Public()
  @Post('/forgot-password')
  async forgotPassword(@Res() res: Response, @Body() body: ForgotPasswordInterface): Promise<Response> {
    try {
      const tokenForgot = await this.authService.forgotPassword(res, body);

      return successCode(res, tokenForgot)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }


  @Public()
  @Post('/refresh-token')
  async refreshToken(@Res() res: Response, @Body() body: refreshTokensInterface): Promise<Response> {
    try {

      const tokens = await this.authService.refreshToken(body);
      return successCode(res, tokens)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Public()
  @Put('/reset-password/:token')
  async resetPass(@Res() res: Response, @Param('token') token: string, @Body() body: ResetPassInterface): Promise<Response> {
    try {

      const password = await this.authService.resetPass(token, body);
      return successCode(res, password)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Public()
  @Put('/verify-email/:token')
  async verifyEmail(@Res() res: Response, @Param('token') token: string) {
    try {

      const message = await this.authService.verifyEmail(token);
      return successCode(res, '', message)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

}
