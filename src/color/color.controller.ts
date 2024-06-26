import { Controller, Get, Post, Body, Param, Delete, HttpException, Res } from '@nestjs/common';
import { ColorService } from './color.service';
import { ApiTags } from '@nestjs/swagger';
import { Color } from '@prisma/client';
import { successCode } from 'src/response';
import { InternalServerErrorException } from 'src/exception/exception';
import { Response } from 'express';
import { ColorDTO } from 'src/color/dto/create-color.dto';

@ApiTags("Color")
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) { }

  @Post('/create-color')
  async create(@Body() createColorDto: ColorDTO, @Res() res: Response,): Promise<Response> {
    try {
      const create: Color = await this.colorService.create(createColorDto);
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
  async getColorList(@Res() res: Response): Promise<Response> {

    try {
      const colors: Color[] = await this.colorService.getColorList();
      return successCode(res, colors)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Delete('/delete-color/:id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    try {
      const checkColor: Color = await this.colorService.remove(+id);
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
  async findColor(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    try {
      const color: Color = await this.colorService.findColor(+id);
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
