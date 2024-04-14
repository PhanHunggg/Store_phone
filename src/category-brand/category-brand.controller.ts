import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpException,
  Res,
} from '@nestjs/common';
import { CategoryBrandService } from './category-brand.service';
import { CategoryBrandInterface } from './interface';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { successCode } from 'src/response';
import { InternalServerErrorException } from 'src/exception/exception';
import { Response } from 'express';
import { CategoryBrand } from '@prisma/client';

@Public()
@ApiTags('CategoryBrand')
@Controller('category-brand')
export class CategoryBrandController {
  constructor(private readonly categoryBrandService: CategoryBrandService) {}

  @Post('/create-categoryBrand')
  async create(
    @Body() createCategoryBrandDto: CategoryBrandInterface,
    @Res() res: Response,
  ): Promise<Response> {

    try {
    const categoryBrand: CategoryBrand = await this.categoryBrandService.create(createCategoryBrandDto);
      return successCode(res, categoryBrand)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Get('/categoryBrand-list')
  async findAll(@Res() res: Response): Promise<Response> {
    try {
    const checkCategoryBrand: CategoryBrand[]  = await this.categoryBrandService.findAll();
      return successCode(res, checkCategoryBrand)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Delete('/delete-categoryBrand/:id_categoryBrand')
  async deleteCategoryBrand(
    @Param('id_categoryBrand') id_categoryBrand: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const categoryBrand: CategoryBrand = await this.categoryBrandService.deleteCategoryBrand(
        +id_categoryBrand
      );
        return successCode(res, categoryBrand, "Xoa thanh cong")
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        } else {
          throw new InternalServerErrorException(error.message);
        }
      }
  }

  @Put('/update-categoryBrand/:id_categoryBrand')
  async updateCategoryBrand(
    @Param('id_categoryBrand') id_categoryBrand: string,
    @Body() categoryBrand: CategoryBrandInterface,
    @Res() res: Response,
  ): Promise<Response> {
  
    try {
      const updateCategoryBrand: CategoryBrandInterface = await this.categoryBrandService.updateCategoryBrand(
        categoryBrand,
        +id_categoryBrand,
      );
        return successCode(res, updateCategoryBrand, "Cap nhat thanh cong")
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        } else {
          throw new InternalServerErrorException(error.message);
        }
      }
  }
}