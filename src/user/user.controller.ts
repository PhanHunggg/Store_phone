import { Body, Controller, Delete, Get, Param, Put, HttpException, InternalServerErrorException, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { successCode } from 'src/response';
import { Response } from 'express';
import { ProfileInterface } from 'src/auth/interface/profile';
import { UpdateUserDTO } from 'src/user/dto/update-user.dto';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("/get-user-list")
  async getUserList(@Res() res: Response): Promise<Response> {
    try {
      const users: ProfileInterface[] = await this.userService.getUserList();

      return successCode(res, users);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Get("/find-user/:id")
  async findUser(@Res() res: Response, @Param('id') id: string): Promise<Response> {
    try {
      const user: ProfileInterface = await this.userService.findUser(+id);

      return successCode(res, user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Delete("/delete-user/:id")
  async deleteUser(@GetCurrentUserId() userId: number, @Res() res: Response, @Param('id') id: string): Promise<Response> {
    try {
      const user: ProfileInterface = await this.userService.deleteUser(+id, userId);

      return successCode(res, user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Put("/update-user/:id")
  async updateUser(@Res() res: Response, @Param('id') id: string, @Body() body: UpdateUserDTO): Promise<Response> {
    try {
      const updatedUser: ProfileInterface = await this.userService.updateUser(+id, body);

      return successCode(res, updatedUser);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}