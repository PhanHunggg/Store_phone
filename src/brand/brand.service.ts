import { HttpException, Injectable } from '@nestjs/common';
import { Brand, PrismaClient } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';
import { BrandInterface, CreateBrandInterface } from './interface';
import { BrandRepository } from './brand.repository';
import { InternalServerErrorException, NotFoundException } from 'src/exception/exception';

@Injectable()
export class BrandService {


  constructor(
    private brandRepository: BrandRepository) { }

  async createBrand(res: any, brand: CreateBrandInterface,): Promise<BrandInterface> {
    try {
      const newData: BrandInterface = {
        name: brand.name,
        img: brand.banner
      };
      await this.brandRepository.createBrand(newData)
      return newData
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async removeBrand(res: any, id: number): Promise<Brand> {
    try {
      const checkBrand: Brand = await this.brandRepository.findBrandById(id)

      if (!checkBrand) {
        throw new NotFoundException('Không tìm thấy brand!')
      }

      await this.brandRepository.deleteBrand(id)

      return checkBrand
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async getBrandList(res: any): Promise<Brand[]> {
    try {
      const checkBrand: Brand[] = await this.brandRepository.getBrandList()
      return checkBrand
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async updateBrand(res: any, brand: CreateBrandInterface, id_brand: number) {
    try {

      const checkBrand = await this.brandRepository.findBrandById(id_brand)

      if (!checkBrand) {
        errCode(res, id_brand, "Không tìm thấy hãng")
        return
      }

      const newData: BrandInterface = {
        name: brand.name,
        img: brand.banner
      };
      await this.brandRepository.updateBrand(newData, id_brand)

      successCode(res, newData)

    } catch (error) {
      failCode(res, error.message)
    }
  }

  async findBrand(res: any, id: number) {
    try {
      const brand = await this.brandRepository.findBrandById(id)

      if (!brand) {
        errCode(res, id, "Không tìm thấy brand!")
        return
      }
      successCode(res, brand)
    } catch (error) {
      failCode(res, error.message)
    }
  }

}
