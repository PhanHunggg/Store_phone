import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { Brand, PrismaClient } from '@prisma/client';
import { BrandInterface } from './interface';
import { BrandRepository } from './brand.repository';
import { InternalServerErrorException, NotFoundException } from 'src/exception/exception';
import { CreateBrandDTO } from 'src/brand/dto/create-brand.dto';

@Injectable()
export class BrandService {


  constructor(
    private brandRepository: BrandRepository) { }

  async createBrand(brand: CreateBrandDTO,): Promise<BrandInterface> {
    try {

      const checkBrand = await this.brandRepository.findBrandByName(brand.name);

      if (checkBrand) {
        throw new ConflictException('Hãng đã tồn tại!');
      }
      const newData: BrandInterface = {
        name: brand.name,
        img: brand.banner
      };
      await this.brandRepository.createBrand(newData)
      return newData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async removeBrand(id: number): Promise<Brand> {
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

  async getBrandList(): Promise<Brand[]> {
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

  async updateBrand(brand: CreateBrandDTO, id_brand: number): Promise<BrandInterface> {
    try {
      const newData: BrandInterface = {
        name: brand.name,
        img: brand.banner
      };
      await this.brandRepository.updateBrand(newData, id_brand)

      return newData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async findBrand(id: number): Promise<Brand> {
    try {
      const brand: Brand = await this.brandRepository.findBrandById(id)
      if (!brand) throw new NotFoundException("Không tìm thấy brand")
      return brand;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
