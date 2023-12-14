import { Body, Controller, Delete, Get, Param, Post, Put, Response } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInterface } from './interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("/create-user")
  createUser(@Body() createCategoryDto: CreateUserInterface, @Response() res: any) {

    return this.userService.createUser(res, createCategoryDto);
  }

  @Get("/get-user-list")
  getUserList(@Response() res: any) {

    return this.userService.getUserList(res);
  }

  @Get("/find-user/:id")
  findOne(@Response() res: any, @Param('id') id: string) {

    return this.userService.findProduct(res, +id);
  }

  @Delete("/delete-user/:id")
  deleteUser(@Response() res: any, @Param('id') id: string) {

    return this.userService.deleteUser(res, +id);
  }

  @Put("/update-user/:id")
  updateUser(@Response() res: any, @Param('id') id: string, @Body() body: CreateUserInterface) {

    return this.userService.updateUser(res, +id, body);
  }
}
