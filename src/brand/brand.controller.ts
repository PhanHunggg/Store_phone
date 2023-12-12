import { Controller, Get, Post, Body, Patch, Param, Delete, Response, UseInterceptors, UploadedFile, UseGuards, Put } from '@nestjs/common';
import { BrandService } from './brand.service';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBrandDto } from './dto/create-brand.dto';
import { AtGuard } from 'src/guards/at.guards';
import { PublicGuard } from 'src/guards/jwt-public.guards';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Brand")
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post("/create-brand")
  @UseInterceptors(FileInterceptor('img'))
  createBrand(@Response() res: any, @UploadedFile() file: Express.Multer.File, @Body() body: CreateBrandDto) {
    return this.brandService.createBrand(res, body, file);
  }

  @Delete('/delete-brand/:id_brand')
  removeBrand(@Response() res: any, @Param('id_brand') id_brand: string) {
    return this.brandService.removeBrand(res,+id_brand);
  }

  @UseGuards(PublicGuard)
  @Get('/brand-list')
  getBrandList(@Response() res: any, ) {
    return this.brandService.getBrandList(res);
  }

  @Put("/update-brand/:id_brand")
  @UseInterceptors(FileInterceptor('img'))
  updateBrand(@Param('id_brand') id_brand: string ,@Response() res: any, @UploadedFile() file: Express.Multer.File, @Body() body: CreateBrandDto) {
    return this.brandService.updateBrand(res, body, file, +id_brand);
  }

  
}
