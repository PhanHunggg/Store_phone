import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryInterface } from './interface';
import { Category, PrismaClient } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';
import { CategoryRepository } from './category.repository';
import { InternalServerErrorException, NotFoundException } from 'src/exception/exception';

@Injectable()
export class CategoryService {

  constructor(private categoryRepository: CategoryRepository) { }

  prisma = new PrismaClient()


  async createCategory(category: CreateCategoryInterface): Promise<CreateCategoryInterface> {
    try {
      const newData: CreateCategoryInterface = {
        name: category.name,
      };
      await this.categoryRepository.createCategory(newData)
      return newData
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async getCategoryList():Promise<Category[]> {
    try {
      const checkCategory: Category[] = await this.categoryRepository.getCategoryList()

      return checkCategory;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }



  async updateCategory(category: CreateCategoryInterface, id_category: number): Promise<Category> {
    try {
      const checkCategory: Category = await this.categoryRepository.findCategory(id_category)

      if (!checkCategory) {
        throw new NotFoundException("Không tìm thấy loại sản phẩm")
      }

      await this.categoryRepository.updateCategory(id_category, category)

      return checkCategory;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }

  }

  async deleteCategory(id_category: number): Promise<Category> {
    try {
      const checkCategory: Category = await this.categoryRepository.findCategory(id_category)

      if (!checkCategory) {
        throw new NotFoundException("Không tìm thấy loại sản phẩm")
      }
      await this.categoryRepository.deleteCategory(id_category)
      
      return checkCategory;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async findCategory(id: number): Promise<Category> {
    try {
      const category: Category = await this.categoryRepository.findCategory(id)

      if (!category) {
        throw new NotFoundException("Không tìm thấy loại sản phẩm")
      }
      return category;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
