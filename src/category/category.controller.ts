
import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryInterface } from './interface';

import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

  @Public()
  @ApiTags("Category")
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post("/create-category")
  createCategory(@Body() createCategoryDto: CreateCategoryInterface, @Response() res: any) {
    return this.categoryService.createCategory(res, createCategoryDto);
  }

  @Put("/update-category/:id_category")
  updateCategory(@Param('id_category') id_category: string, @Body() createCategoryDto: CreateCategoryInterface, @Response() res: any) {
    return this.categoryService.updateCategory(res, createCategoryDto, +id_category);
  }

  @Get('/category-list')
  getCategoryList(@Response() res: any) {
    return this.categoryService.getCategoryList(res);
  }

  @Get('/find-category/:id')
  findCategory(@Param('id') id: string, @Response() res: any) {
    return this.categoryService.findCategory(res, +id);
  }



  @Delete('/delete-category/:id_category')
  deleteCategory(@Param('id_category') id_category: string, @Response() res: any) {
    return this.categoryService.deleteCategory(+id_category, res);
  }
}
