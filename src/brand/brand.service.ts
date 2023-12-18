import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BrandInterface, CreateBrandInterface } from './interface';
import { BrandRepository } from './brand.repository';

@Injectable()
export class BrandService {


  constructor(private cloudinary: CloudinaryService,
    private brandRepository: BrandRepository) { }

  async createBrand(res: any, brand: CreateBrandInterface,) {
    try {
      const newData: BrandInterface = {
        name: brand.name,
        img: brand.banner
      };


      await this.brandRepository.createBrand(newData)
      successCode(res, newData)
    } catch (error) {
      failCode(res, error.message)
    }
  }

  async removeBrand(res, id: number) {

    const checkBrand = await this.brandRepository.findBrandById(id)

    if (!checkBrand) {
      errCode(res, id, "Không tìm thấy hãng")
      return
    }


    await this.cloudinary.deleteImage(checkBrand.img)

    await this.brandRepository.deleteBrand(id)

    successCode(res, "")
  }

  async getBrandList(res: any) {
    const checkBrand = await this.brandRepository.getBrandList()

    if (!checkBrand) {
      errCode(res, checkBrand, "Không tìm thấy hãng")
      return
    }

    successCode(res, checkBrand)
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
