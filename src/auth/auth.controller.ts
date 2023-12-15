import { Body, Controller, Get, Post, Put, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpInterface, UserDTO, loginInterFace } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/login")
  login(@Response() res: any, @Body() body: loginInterFace) {
    return this.authService.login(res, body);
  }

  @Put("/update-password")
  updatePassword(@Response() res: any, @Body() body: loginInterFace) {
    return this.authService.updatePassword(res, body);
  }

  @Post("/sign-up")
  signUp(@Response() res: any, @Body() body: SignUpInterface) {
    return this.authService.signUp(res, body);
  }

}
