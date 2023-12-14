import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BrandRepository } from './brand.repository';


@Module({
  controllers: [BrandController],
  providers: [BrandService, CloudinaryService, BrandRepository]
})
export class BrandModule {}
