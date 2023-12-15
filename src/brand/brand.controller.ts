import { Controller, Get, Post, Body, Patch, Param, Delete, Response, UseInterceptors, UploadedFile, UseGuards, Put } from '@nestjs/common';
import { BrandService } from './brand.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicGuard } from 'src/guards/jwt-public.guards';
import { ApiTags } from '@nestjs/swagger';
import { BrandInterface, CreateBrandInterface } from './interface';

@ApiTags("Brand")
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post("/create-brand")
  @UseInterceptors(FileInterceptor('img'))
  createBrand(@Response() res: any, @UploadedFile() file: Express.Multer.File, @Body() body: BrandInterface) {
    return this.brandService.createBrand(res, body, file);
  }

  @Delete('/delete-brand/:id_brand')
  removeBrand(@Response() res: any, @Param('id_brand') id_brand: string) {
    return this.brandService.removeBrand(res, +id_brand);
  }

  @Get('/brand-list')
  getBrandList(@Response() res: any,) {
    return this.brandService.getBrandList(res);
  }

  @Put("/update-brand/:id_brand")
  @UseInterceptors(FileInterceptor('img'))
  updateBrand(@Param('id_brand') id_brand: string, @Response() res: any, @UploadedFile() file: Express.Multer.File, @Body() body: CreateBrandInterface) {
    return this.brandService.updateBrand(res, body, file, +id_brand);
  }


  @Get('/find-brand/:id')
  findBrand(@Response() res: any, @Param('id') id: string) {
    return this.brandService.findBrand(res, +id);
  }


}
