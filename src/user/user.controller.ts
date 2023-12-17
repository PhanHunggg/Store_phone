import { Body, Controller, Delete, Get, Param, Post, Put, Response } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserInterface } from './interface/update-user';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("/get-user-list")
  getUserList(@Response() res: any) {

    return this.userService.getUserList(res);
  }

  @Get("/find-user/:id")
  findUser(@Response() res: any, @Param('id') id: string) {

    return this.userService.findUser(res, +id);
  }

  @Delete("/delete-user/:id")
  deleteUser(@Response() res: any, @Param('id') id: string) {

    return this.userService.deleteUser(res, +id);
  }

  @Put("/update-user/:id")
  updateUser(@Response() res: any, @Param('id') id: string, @Body() body: UpdateUserInterface) {

    return this.userService.updateUser(res, +id, body);
  }
}
