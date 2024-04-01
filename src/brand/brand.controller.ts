import { Controller, Get, Post, Body, Patch, Param, Delete, Response, UseInterceptors, UploadedFile, UseGuards, Put, HttpException, InternalServerErrorException } from '@nestjs/common';
import { BrandService } from './brand.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { BrandInterface, CreateBrandInterface } from './interface';
import { Public } from 'src/common/decorators/public.decorator';
import { successCode } from 'src/response';
import { Brand } from '@prisma/client';

@Public()
@ApiTags("Brand")
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post("/create-brand")
  async createBrand(@Response() res: any, @Body() body: CreateBrandInterface) {
    try {
      const brand: BrandInterface = await this.brandService.createBrand(res, body);
      return successCode(res, brand)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Delete('/delete-brand/:id_brand')
  async removeBrand(@Response() res: any, @Param('id_brand') id_brand: string) {
    try {
      const brand: Brand = await this.brandService.removeBrand(res, +id_brand);
      return successCode(res, brand)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Get('/brand-list')
  async getBrandList(@Response() res: any,) {
    try {
      const brandList: Brand[] = await this.brandService.getBrandList(res);
      return successCode(res, brandList)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Put("/update-brand/:id_brand")
  updateBrand(@Param('id_brand') id_brand: string, @Response() res: any, @Body() body: CreateBrandInterface) {
    return this.brandService.updateBrand(res, body, +id_brand);
  }


  @Get('/find-brand/:id')
  findBrand(@Response() res: any, @Param('id') id: string) {
    return this.brandService.findBrand(res, +id);
  }


}
