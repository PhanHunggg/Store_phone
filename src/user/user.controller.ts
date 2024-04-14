import { Body, Controller, Delete, Get, Param, Put, Response, HttpException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserInterface } from './interface/update-user';
import { createCode, successCode } from 'src/response';
import { UserInterface } from './interface/user';
@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("/get-user-list")
  async getUserList(@Response() res: Response): Promise<Response> {
    try {
      const users = await this.userService.getUserList();

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
  async findUser(@Response() res: Response, @Param('id') id: string): Promise<Response> {
    try {
      const user = await this.userService.findUser(+id);

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
  async deleteUser(@Response() res: Response, @Param('id') id: string): Promise<Response> {
    try {
      await this.userService.deleteUser(+id);

      return successCode(res, "Xóa user thành công");
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Put("/update-user/:id")
  async updateUser(@Response() res: Response, @Param('id') id: string, @Body() body: UserInterface): Promise<Response> {
    try {
      const updatedUser = await this.userService.updateUser(+id, body);

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