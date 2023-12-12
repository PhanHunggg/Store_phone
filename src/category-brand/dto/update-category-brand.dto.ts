import { PartialType } from '@nestjs/swagger';
import { CreateCategoryBrandDto } from './create-category-brand.dto';

export class UpdateCategoryBrandDto extends PartialType(CreateCategoryBrandDto) {}
