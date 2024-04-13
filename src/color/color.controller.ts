import { Controller, Get, Post, Body, Patch, Param, Delete, Response, HttpException } from '@nestjs/common';
import { ColorService } from './color.service';
import { ApiTags } from '@nestjs/swagger';
import { ColorInterface } from './interface';
import { Color } from '@prisma/client';
import { successCode } from 'src/response';
import { InternalServerErrorException } from 'src/exception/exception';

@ApiTags("Color")
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) { }

  @Post('/create-color')
  async create(@Body() createColorDto: ColorInterface, @Response() res: any,) {
    try {
      const create: ColorInterface = await this.colorService.create(createColorDto, res);
      return successCode(res, create)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Get('/color-list')
  async getColorList(@Response() res: any) {

    try {
      const color: Color[] = await this.colorService.getColorList(res);
      return successCode(res, color)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Delete('/delete-color/:id')
  async remove(@Param('id') id: string, @Response() res: any) {
    try {
      const checkColor: Color = await this.colorService.remove(+id, res);
      return successCode(res, checkColor)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Get('/find-color/:id')
  async findColor(@Param('id') id: string, @Response() res: any) {
    try {
      const color: Color = await this.colorService.findColor(res, +id);
      return successCode(res, color)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
