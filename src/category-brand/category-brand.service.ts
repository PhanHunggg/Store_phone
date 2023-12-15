import { Injectable } from '@nestjs/common';
import { CategoryBrandInterface } from './interface';
import { PrismaClient } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';
import { CategoryBrandRepository } from './category-brand.repository';

@Injectable()
export class CategoryBrandService {

  constructor(private categoryBrandRepository: CategoryBrandRepository) { }

  prisma = new PrismaClient()

  async create(categoryBrand: CategoryBrandInterface, res: any) {
    try {

      const newData: CategoryBrandInterface = {
        id_brand: categoryBrand.id_brand,
        id_category: categoryBrand.id_category
      };

      await this.categoryBrandRepository.createCategoryBrand(newData)

      successCode(res, newData)

    } catch (error) {
      failCode(res, error.message)
    }
  }

  async findAll(res: any) {
    try {
      const checkCategoryBrand = await this.categoryBrandRepository.findAll()

      if (!!!checkCategoryBrand.length) {
        errCode(res, checkCategoryBrand, "Không tìm thấy loại sản phẩm!")
        return
      }

      successCode(res, checkCategoryBrand)
    } catch (error) {
      failCode(res, error.message)
    }
  }

  async deleteCategoryBrand(id_categoryBrand: number, res: any) {
    try {
      const checkCategory = await this.categoryBrandRepository.findCategoryBrand(id_categoryBrand)

      if (!checkCategory) {
        errCode(res, checkCategory, "Không tìm thấy loại sản phẩm theo hãng!")
        return
      }

      await this.categoryBrandRepository.deleteCategoryBrand(id_categoryBrand)

      successCode(res, '')
    } catch (error) {
      failCode(res, error.message)
    }
  }

  async updateCategoryBrand(res: any, categoryBrand: CategoryBrandInterface, id_categoryBrand: number) {
    try {

      const checkCategory = await this.categoryBrandRepository.findCategoryBrand(id_categoryBrand)

      if (!checkCategory) {
        errCode(res, id_categoryBrand, "Không tìm thấy loại sản phẩm!")
        return
      }

      const newData: CategoryBrandInterface = categoryBrand

      await this.categoryBrandRepository.updateCategoryBrand(newData, id_categoryBrand)

      successCode(res, newData)
    } catch (error) {
      failCode(res, error.message)
    }


  }

}



