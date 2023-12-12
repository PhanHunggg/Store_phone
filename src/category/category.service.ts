import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaClient } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';

@Injectable()
export class CategoryService {

  prisma = new PrismaClient()


  async createCategory(res: any, category: CreateCategoryDto) {
    try {


      const newData = {
        name: category.name,
      };


      await this.prisma.category.create({
        data: newData
      });
      successCode(res, newData)
    } catch (error) {
      failCode(res, error.message)
    }
  }

  async getCategoryList(res: any) {
    try {
      const checkCategory = await this.prisma.category.findMany()

      if (!!!checkCategory.length) {
        errCode(res, checkCategory, "Không tìm thấy loại sản phẩm!")
        return
      }

      successCode(res, checkCategory)
    } catch (error) {
      failCode(res, error.message)
    }
  }



  async updateCategory(res: any, category: CreateCategoryDto, id_category: number) {
    try {
      const checkCategory = this.prisma.category.findUnique({
        where: {
          id_category: id_category
        }
      })

      if (!checkCategory) {
        errCode(res, id_category, "Không tìm thấy loại sản phẩm!")
        return
      }

      await this.prisma.category.update({
        where: {
          id_category: id_category
        },
        data: category
      })

      successCode(res, category)
    } catch (error) {
      failCode(res, error.message)
    }

  }

  async deleteCategory(id_category: number, res: any) {
    try {
      const checkCategory = await this.prisma.category.findUnique({
        where: {
          id_category: id_category
        }
      })

      if (!checkCategory) {
        errCode(res, checkCategory, "Không tìm thấy loại sản phẩm!")
        return
      }

      await this.prisma.category.delete({
        where: {
          id_category: id_category
        }
      })

      successCode(res, '')
    } catch (error) {
      failCode(res, error.message)
    }
  }
}
