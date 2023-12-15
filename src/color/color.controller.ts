import { Controller, Get, Post, Body, Patch, Param, Delete, Response } from '@nestjs/common';
import { ColorService } from './color.service';
import { ApiTags } from '@nestjs/swagger';
import { ColorInterface } from './interface';

@ApiTags("Color")
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) { }

  @Post('/create-color')
  create(@Body() createColorDto: ColorInterface, @Response() res: any) {
    return this.colorService.create(createColorDto, res);
  }

  @Get('/color-list')
  getColorList(@Response() res: any) {
    return this.colorService.getColorList(res);
  }

  @Delete('/delete-color/:id')
  remove(@Param('id') id: string, @Response() res: any) {
    return this.colorService.remove(+id, res);
  }

  @Get('/find-color/:id')
  findColor(@Param('id') id: string, @Response() res: any) {
    return this.colorService.findColor(res, +id);

  }
}
