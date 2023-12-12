import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


@Module({
  controllers: [BrandController],
  providers: [BrandService, CloudinaryService]
})
export class BrandModule {}
