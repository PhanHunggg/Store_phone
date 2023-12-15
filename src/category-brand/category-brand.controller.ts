
import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Put } from '@nestjs/common';
import { CategoryBrandService } from './category-brand.service';
import { CategoryBrandInterface } from './interface';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@ApiTags("CategoryBrand")
@Controller('category-brand')
export class CategoryBrandController {
  constructor(private readonly categoryBrandService: CategoryBrandService) { }

  @Post('/create-categoryBrand')
  create(@Body() createCategoryBrandDto: CategoryBrandInterface, @Response() res: any) {
    return this.categoryBrandService.create(createCategoryBrandDto, res);
  }

  @Get("/categoryBrand-list")
  findAll(@Response() res: any) {
    return this.categoryBrandService.findAll(res);
  }

  @Delete('/delete-categoryBrand/:id_categoryBrand')
  deleteCategoryBrand(@Param('id_categoryBrand') id_categoryBrand: string, @Response() res: any) {
    return this.categoryBrandService.deleteCategoryBrand(+id_categoryBrand, res);
  }

  @Put('/update-categoryBrand/:id_categoryBrand')
  updateCategoryBrand(@Param('id_categoryBrand') id_categoryBrand: string, @Body() categoryBrand: CategoryBrandInterface, @Response() res: any) {
    return this.categoryBrandService.updateCategoryBrand(res, categoryBrand, +id_categoryBrand);
  }




}
