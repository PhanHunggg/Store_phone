import { Module } from '@nestjs/common';
import { CategoryBrandService } from './category-brand.service';
import { CategoryBrandController } from './category-brand.controller';
import { CategoryBrandRepository } from './category-brand.repository';

@Module({
  controllers: [CategoryBrandController],
  providers: [CategoryBrandService, CategoryBrandRepository]
})
export class CategoryBrandModule {}
