import { Controller, Get, Post, Body, Patch, Param, Delete, Response, UseInterceptors, UploadedFile, UseGuards, Put } from '@nestjs/common';
import { BrandService } from './brand.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicGuard } from 'src/common/guards/jwt-public.guards';
import { ApiTags } from '@nestjs/swagger';
import { BrandInterface, CreateBrandInterface } from './interface';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@ApiTags("Brand")
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post("/create-brand")
  createBrand(@Response() res: any, @Body() body: CreateBrandInterface) {
    return this.brandService.createBrand(res, body);
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
  updateBrand(@Param('id_brand') id_brand: string, @Response() res: any, @Body() body: CreateBrandInterface) {
    return this.brandService.updateBrand(res, body, +id_brand);
  }


  @Get('/find-brand/:id')
  findBrand(@Response() res: any, @Param('id') id: string) {
    return this.brandService.findBrand(res, +id);
  }


}
