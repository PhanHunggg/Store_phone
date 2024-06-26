
import { Controller, Get, Post, Body, Patch, Param, Delete,  Put, HttpException, Res } from '@nestjs/common';
import { CategoryService } from './category.service';

import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { createCode, successCode } from 'src/response';
import { InternalServerErrorException } from 'src/exception/exception';
import { Response } from 'express';
import { Category } from '@prisma/client';
import { CreateCategoryDTO } from 'src/category/dto/ctrate-category.dto';

@Public()
@ApiTags("Category")
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post("/create-category")
  async createCategory(@Body() createCategoryDto: CreateCategoryDTO, @Res() res: Response): Promise<Response> {
    try {
      const category: Category = await this.categoryService.createCategory(createCategoryDto);
      return createCode(res, category)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }


  @Put("/update-category/:id_category")
  async updateCategory(@Param('id_category') id_category: string, @Body() createCategoryDto: CreateCategoryDTO, @Res() res: Response): Promise<Response> {
    try {
      const category: Category = await this.categoryService.updateCategory(createCategoryDto, +id_category);
      return createCode(res, category)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Get('/category-list')
  async getCategoryList(@Res() res: Response): Promise<Response> {
    try {
      const category: Category[] = await this.categoryService.getCategoryList();
      return successCode(res, category)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Get('/find-category/:id')
  async findCategory(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    try {
      const category: Category = await this.categoryService.findCategory(+id);
      return successCode(res, category)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }



  @Delete('/delete-category/:id_category')
  async deleteCategory(@Param('id_category') id_category: string, @Res() res: Response): Promise<Response> {
    try {
      const category: Category = await this.categoryService.deleteCategory(+id_category);
      return successCode(res, category)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}

