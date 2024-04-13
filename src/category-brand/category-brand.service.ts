import { HttpException, Injectable } from '@nestjs/common';
import { CategoryBrandInterface } from './interface';
import { CategoryBrand, PrismaClient } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';
import { CategoryBrandRepository } from './category-brand.repository';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from 'src/exception/exception';

@Injectable()
export class CategoryBrandService {
  constructor(private categoryBrandRepository: CategoryBrandRepository) { }

  prisma = new PrismaClient();

  async create(
    categoryBrand: CategoryBrandInterface,
  ): Promise<CategoryBrand> {
    try {

      const checkCategoryBrand = await this.categoryBrandRepository.findByBrandCategory(categoryBrand)

      if (checkCategoryBrand) {
        throw new ConflictException('Loại sản phẩm trong hãng đã tồn tại!');
      }

      const newData: CategoryBrand = await this.categoryBrandRepository.createCategoryBrand(categoryBrand);

      return newData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async findAll(): Promise<CategoryBrand[]> {
    try {
      const checkCategoryBrand: CategoryBrand[] =
        await this.categoryBrandRepository.findAll();
      return checkCategoryBrand;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async deleteCategoryBrand(id_categoryBrand: number): Promise<CategoryBrand> {
    try {
      const checkCategory: CategoryBrand =
        await this.categoryBrandRepository.findCategoryBrand(id_categoryBrand);

      if (!checkCategory) {
        throw new NotFoundException('Không tìm thấy loại sản phẩm trong hãng!');
      }

      await this.categoryBrandRepository.deleteCategoryBrand(id_categoryBrand);
      return checkCategory
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async updateCategoryBrand(
    categoryBrand: CategoryBrandInterface,
    id_categoryBrand: number,
  ): Promise<CategoryBrand> {
    try {
      const checkCategory =
        await this.categoryBrandRepository.findCategoryBrand(id_categoryBrand);

      if (!checkCategory) {
        throw new NotFoundException('Không tìm thấy loại sản phẩm trong hãng!');
      }

      const foundCategoryBrand = await this.categoryBrandRepository.findByBrandCategory(categoryBrand)

      if (foundCategoryBrand) {
        throw new ConflictException('Loại sản phẩm trong hãng đã tồn tại!');
      }

      const newData: CategoryBrand = await this.categoryBrandRepository.updateCategoryBrand(
        categoryBrand,
        id_categoryBrand,
      );
      return newData
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
