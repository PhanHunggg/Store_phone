import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductRepository } from './product.repository';
import { CategoryBrandRepository } from 'src/category-brand/category-brand.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService, CloudinaryService, ProductRepository, CategoryBrandRepository]
})
export class ProductModule {}
