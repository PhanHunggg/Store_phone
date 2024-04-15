import { HttpException, Injectable } from '@nestjs/common';
import { Category, PrismaClient } from '@prisma/client';
import { CategoryRepository } from './category.repository';
import { ConflictException, InternalServerErrorException, NotFoundException } from 'src/exception/exception';
import { CreateCategoryDTO } from 'src/category/dto/ctrate-category.dto';

@Injectable()
export class CategoryService {

  constructor(private categoryRepository: CategoryRepository) { }

  prisma = new PrismaClient()


  async createCategory(category: CreateCategoryDTO): Promise<Category> {
    try {

      const checkCategory: Category = await this.categoryRepository.findCategoryByName(category.name);

      if (checkCategory) {
        throw new ConflictException('Loại sản phẩm đã tồn tại!');
      }

      const newData: Category = await this.categoryRepository.createCategory(category)
      return newData
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async getCategoryList(): Promise<Category[]> {
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



  async updateCategory(category: CreateCategoryDTO, id_category: number): Promise<Category> {
    try {
      const checkCategory: Category = await this.categoryRepository.findCategory(id_category)

      if (!checkCategory) {
        throw new NotFoundException("Không tìm thấy loại sản phẩm")
      }

      const newData: Category = await this.categoryRepository.updateCategory(id_category, category)

      return newData;
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
