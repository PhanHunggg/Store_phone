import { Injectable } from '@nestjs/common';
import { CreateCategoryInterface } from './interface';
import { PrismaClient } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {

  constructor(private categoryRepository: CategoryRepository) { }

  prisma = new PrismaClient()


  async createCategory(res: any, category: CreateCategoryInterface) {
    try {


      const newData: CreateCategoryInterface = {
        name: category.name,
      };


      await this.categoryRepository.createCategory(newData)
      successCode(res, newData)
    } catch (error) {
      failCode(res, error.message)
    }
  }

  async getCategoryList(res: any) {
    try {
      const checkCategory = await this.categoryRepository.getCategoryList()

      if (!!!checkCategory.length) {
        errCode(res, checkCategory, "Không tìm thấy loại sản phẩm!")
        return
      }

      successCode(res, checkCategory)
    } catch (error) {
      failCode(res, error.message)
    }
  }



  async updateCategory(res: any, category: CreateCategoryInterface, id_category: number) {
    try {
      const checkCategory = await this.categoryRepository.findCategory(id_category)

      if (!checkCategory) {
        errCode(res, id_category, "Không tìm thấy loại sản phẩm!")
        return
      }

      await this.categoryRepository.updateCategory(id_category, category)

      successCode(res, category)
    } catch (error) {
      failCode(res, error.message)
    }

  }

  async deleteCategory(id_category: number, res: any) {
    try {
      const checkCategory = await this.categoryRepository.findCategory(id_category)

      if (!checkCategory) {
        errCode(res, checkCategory, "Không tìm thấy loại sản phẩm!")
        return
      }

      await this.categoryRepository.deleteCategory(id_category)

      successCode(res, '')
    } catch (error) {
      failCode(res, error.message)
    }
  }

  async findCategory(res: any, id: number) {
    try {
      const category = await this.categoryRepository.findCategory(id)

      if (!category) {
        errCode(res, id, "Không tìm thấy category!")
        return
      }
      successCode(res, category)
    } catch (error) {
      failCode(res, error.message)
    }
  }
}
