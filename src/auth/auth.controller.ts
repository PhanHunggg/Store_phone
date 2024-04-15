import { Body, Controller, Get, HttpException, InternalServerErrorException, Param, Post, Put, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginResInterface } from './interface/login';
import { SignUpInterfaceRes } from './interface/sign-up';
import {  TokenForgotInterface } from './interface/forgot-password';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { Response } from 'express';
import { createCode, successCode } from 'src/response';
import { SignUpDTO } from 'src/auth/dto/signup.dto';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { ForgotPasswordDTO } from 'src/auth/dto/forgot-pass.dto';
import { ResetPassDTO } from 'src/auth/dto/reset-pass.dto';
import { refreshTokensDTO } from 'src/auth/dto/refresh-token.dto';
import { Tokens } from 'src/auth/type/token.type';

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
  async login(@Res() res: Response, @Body() body: LoginDTO): Promise<Response> {
    try {
      const user: LoginResInterface = await this.authService.login(body);

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
  async loginAdmin(@Res() res: Response, @Body() body: LoginDTO): Promise<Response> {
    try {
      const user: LoginResInterface = await this.authService.loginAdmin(body);

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
  async signUp(@Res() res: Response, @Body() body: SignUpDTO): Promise<Response> {
    try {
      const user: SignUpInterfaceRes = await this.authService.signUp(body);

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
  async forgotPassword(@Res() res: Response, @Body() body: ForgotPasswordDTO): Promise<Response> {
    try {
      const tokenForgot: TokenForgotInterface = await this.authService.forgotPassword(body);

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
  async refreshToken(@Res() res: Response, @Body() body: refreshTokensDTO): Promise<Response> {
    try {

      const tokens: Tokens = await this.authService.refreshToken(body);
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
  async resetPass(@Res() res: Response, @Param('token') token: string, @Body() body: ResetPassDTO): Promise<Response> {
    try {

      const password: string = await this.authService.resetPass(token, body);
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
