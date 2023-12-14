import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BrandDto, CreateBrandInterface } from './dto';
import { BrandRepository } from './brand.repository';

@Injectable()
export class BrandService {


  constructor(private cloudinary: CloudinaryService,
    private brandRepository: BrandRepository) { }

  async createBrand(res: any, brand: CreateBrandInterface, img: Express.Multer.File) {
    try {

      const imgUrl: string = await this.cloudinary.uploadImage(img)

      const newData: BrandDto = {
        name: brand.name, // Use the provided name parameter directly
        img: imgUrl
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

  async updateBrand(res: any, brand: CreateBrandInterface, img: Express.Multer.File, id_brand: number) {
    try {

      const checkBrand = await this.brandRepository.findBrandById(id_brand)

      if (!checkBrand) {
        errCode(res, id_brand, "Không tìm thấy hãng")
        return
      }

      let isValid: boolean = false

      if (img) isValid = true

      if (isValid) {

        await this.cloudinary.deleteImage(checkBrand.img)

        const imgUrl: string = await this.cloudinary.uploadImage(img)

        const newData: BrandDto = {
          name: brand.name,
          img: imgUrl
        };

        await this.brandRepository.updateBrand(newData, id_brand)
        successCode(res, newData)

      } else {

        const newData = {
          name: brand.name,
          img: checkBrand.img
        };

        await this.brandRepository.updateBrand(newData, id_brand)
        successCode(res, newData)
      }


      // await this.prisma.brand.create({
      //   data: newData
      // });
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
