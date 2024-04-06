import { HttpException, Injectable } from '@nestjs/common';
import { CategoryBrandInterface } from './interface';
import { CategoryBrand, PrismaClient } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';
import { CategoryBrandRepository } from './category-brand.repository';
import {
  InternalServerErrorException,
  NotFoundException,
} from 'src/exception/exception';

@Injectable()
export class CategoryBrandService {
  constructor(private categoryBrandRepository: CategoryBrandRepository) {}

  prisma = new PrismaClient();

  async create(
    categoryBrand: CategoryBrandInterface,
  ): Promise<CategoryBrandInterface> {
    try {
      const newData: CategoryBrandInterface = {
        id_brand: categoryBrand.id_brand,
        id_category: categoryBrand.id_category,
      };

      await this.categoryBrandRepository.createCategoryBrand(newData);

      return newData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async findAll(res: any) {
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

  async deleteCategoryBrand(id_categoryBrand: number, res: any) {
    try {
      const checkCategory: CategoryBrand =
        await this.categoryBrandRepository.findCategoryBrand(id_categoryBrand);

      if (!checkCategory) {
        errCode(res, checkCategory, 'Không tìm thấy loại sản phẩm theo hãng!');
        return;
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
    res: any,
    categoryBrand: CategoryBrandInterface,
    id_categoryBrand: number,
  ) {
    try {
      const checkCategory =
        await this.categoryBrandRepository.findCategoryBrand(id_categoryBrand);

      if (!checkCategory) {
        errCode(res, id_categoryBrand, 'Không tìm thấy loại sản phẩm!');
        return;
      }

      const newData: CategoryBrandInterface = categoryBrand;

      await this.categoryBrandRepository.updateCategoryBrand(
        newData,
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
