import { Body, Controller, Get, HttpException, InternalServerErrorException, Param, Patch, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginResInterface } from './interface/login';
import { SignUpInterfaceRes } from './interface/sign-up';
import { TokenForgotInterface } from './interface/forgot-password';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { Response } from 'express';
import { createCode, successCode } from 'src/response';
import { SignUpDTO } from 'src/auth/dto/signup.dto';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { ForgotPasswordDTO } from 'src/auth/dto/forgot-pass.dto';
import { ResetPassTokenDTO } from 'src/auth/dto/reset-pass-token.dto';
import { Tokens } from 'src/auth/type/token.type';
import { ResetPassDTO } from 'src/auth/dto/reset-pass.dto';
import { RtGuard } from 'src/common/guards/rt.guard';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';

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
  @UseGuards(RtGuard)
  @Post('/refresh-token')
  async refreshToken(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string, @Res() res: Response): Promise<Response> {
    try {
      console.log(userId, refreshToken)
      const tokens: Tokens = await this.authService.refreshToken(userId, refreshToken);
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
  async resetPassToken(@Res() res: Response, @Param('token') token: string, @Body() body: ResetPassTokenDTO): Promise<Response> {
    try {

      const password: string = await this.authService.resetPassToken(token, body);
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

  @Patch('/reset-password')
  async resetPass(@GetCurrentUserId() userId: number, @Res() res: Response, @Body() body: ResetPassDTO): Promise<Response> {
    try {

      const password: string = await this.authService.resetPass(userId, body);
      return successCode(res, password)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Patch('/logout')
  async logout(@GetCurrentUserId() userId: number, @Res() res: Response): Promise<Response> {
    try {
      const message = await this.authService.logout(userId);

      return successCode(res, message)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

}
