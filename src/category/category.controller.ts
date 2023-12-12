
import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

import { ApiTags } from '@nestjs/swagger';

@ApiTags("Category")
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post("/create-category")
  createCategory(@Body() createCategoryDto: CreateCategoryDto, @Response() res: any) {
    return this.categoryService.createCategory(res,createCategoryDto);
  }

  @Put("/update-category/:id_category")
  updateCategory(@Param('id_category') id_category: string , @Body() createCategoryDto: CreateCategoryDto, @Response() res: any) {
    return this.categoryService.updateCategory(res,createCategoryDto, +id_category);
  }

  @Get('/category-list')
  getCategoryList(@Response() res: any, ) {
    return this.categoryService.getCategoryList(res);
  }
  

  @Delete('/delete-category/:id_category')
  deleteCategory(@Param('id_category') id_category: string, @Response() res: any ) {
    return this.categoryService.deleteCategory(+id_category,res);
  }
}
