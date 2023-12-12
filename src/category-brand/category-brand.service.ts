import { Injectable } from '@nestjs/common';
import { CreateCategoryBrandDto } from './dto/create-category-brand.dto';
import { UpdateCategoryBrandDto } from './dto/update-category-brand.dto';
import { PrismaClient } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';

@Injectable()
export class CategoryBrandService {

  prisma = new PrismaClient()

  async create(categoryBrand: CreateCategoryBrandDto, res: any) {
    try {

      const newData: CreateCategoryBrandDto = {
        id_brand: categoryBrand.id_brand,
        id_category: categoryBrand.id_category
      };

      await this.prisma.categoryBrand.create({
        data: newData
      });

      successCode(res, newData)

    } catch (error) {
      failCode(res, error.message)
    }
  }

  async findAll(res: any) {
    try {
      const checkCategoryBrand = await this.prisma.categoryBrand.findMany()

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
      const checkCategory = await this.prisma.categoryBrand.findUnique({
        where: {
          id_categoryBrand: id_categoryBrand
        }
      })

      if (!checkCategory) {
        errCode(res, checkCategory, "Không tìm thấy loại sản phẩm theo hãng!")
        return
      }

      await this.prisma.categoryBrand.delete({
        where: {
          id_categoryBrand: id_categoryBrand
        }
      })

      successCode(res, '')
    } catch (error) {
      failCode(res, error.message)
    }
  }

  async updateCategoryBrand(res: any, categoryBrand: CreateCategoryBrandDto, id_categoryBrand: number) {
    try {

      const checkCategory = await this.prisma.categoryBrand.findUnique({
        where: {
          id_categoryBrand: id_categoryBrand
        }
      })

      if (!checkCategory) {
        errCode(res, id_categoryBrand, "Không tìm thấy loại sản phẩm!")
        return
      }

      const newData: CreateCategoryBrandDto = categoryBrand

      await this.prisma.categoryBrand.update({
        where: {
          id_categoryBrand: id_categoryBrand
        },
        data: newData
      })

      successCode(res, newData)
    } catch (error) {
      failCode(res, error.message)
    }


  }

}



