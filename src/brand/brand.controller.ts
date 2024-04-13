import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Put, HttpException, InternalServerErrorException, Res } from '@nestjs/common';
import { BrandService } from './brand.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { BrandInterface, CreateBrandInterface } from './interface';
import { Public } from 'src/common/decorators/public.decorator';
import { createCode, successCode } from 'src/response';
import { Brand } from '@prisma/client';
import { Response } from 'express';

@Public()
@ApiTags("Brand")
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post("/create-brand")
  async createBrand(@Res() res: Response, @Body() body: CreateBrandInterface): Promise<Response> {
    try {
      const brand: BrandInterface = await this.brandService.createBrand(body);
      return createCode(res, brand)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Delete('/delete-brand/:id_brand')
  async removeBrand(@Res() res: Response, @Param('id_brand') id_brand: string): Promise<Response> {
    try {
      const brand: Brand = await this.brandService.removeBrand(+id_brand);
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
  async getBrandList(@Res() res: Response): Promise<Response> {
    try {
      const brandList: Brand[] = await this.brandService.getBrandList();
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
  async updateBrand(@Param('id_brand') id_brand: string, @Res() res: Response, @Body() body: CreateBrandInterface): Promise<Response> {
    try {
      const brand: BrandInterface = await this.brandService.updateBrand(body, +id_brand);
      return successCode(res, brand)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }


  @Get('/find-brand/:id')
  async findBrand(@Res() res: Response, @Param('id') id: string): Promise<Response> {
    try {
      const brand: Brand = await this.brandService.findBrand(+id);
      return successCode(res, brand)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }


}
