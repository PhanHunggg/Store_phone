import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaClient } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BrandService {


  constructor(private cloudinary: CloudinaryService) { }
  prisma = new PrismaClient()

  async createBrand(res: any, brand: CreateBrandDto, img: Express.Multer.File) {
    try {

      const imgUrl: string = await this.cloudinary.uploadImage(img)

      const newData = {
        name: brand.name, // Use the provided name parameter directly
        img: imgUrl
      };


      await this.prisma.brand.create({
        data: newData
      });
      successCode(res, newData)
    } catch (error) {
      failCode(res, error.message)
    }
  }

  async removeBrand(res, id: number) {
    const checkBrand = await this.prisma.brand.findUnique({
      where: {
        id_brand: id,
      }
    })

    if (!checkBrand) {
      errCode(res, id, "Không tìm thấy hãng")
      return
    }


    await this.cloudinary.deleteImage(checkBrand.img)

    await this.prisma.brand.delete({
      where: {
        id_brand: id,
      }
    })

    successCode(res, "")
  }

  async getBrandList(res: any) {
    const checkBrand = await this.prisma.brand.findMany()

    if (!checkBrand) {
      errCode(res, checkBrand, "Không tìm thấy hãng")
      return
    }

    successCode(res, checkBrand)
  }

  async updateBrand(res: any, brand: CreateBrandDto, img: Express.Multer.File, id_brand: number) {
    try {

      const checkBrand = await this.prisma.brand.findUnique({
        where: {
          id_brand: id_brand,
        }
      })
  
      if (!checkBrand) {
        errCode(res, id_brand, "Không tìm thấy hãng")
        return
      }

      let isValid: boolean = false
      if (img) isValid = true

      if (isValid) {

        await this.cloudinary.deleteImage(checkBrand.img)

        const imgUrl: string = await this.cloudinary.uploadImage(img)

        const newData = {
          name: brand.name,
          img: imgUrl
        };

        await this.prisma.brand.update({
          where: {
            id_brand: id_brand
          },
          data: newData
        })
        successCode(res, newData)

      }else{

        const newData = {
          name: brand.name,
          img: checkBrand.img
        };

        await this.prisma.brand.update({
          where: {
            id_brand: id_brand
          },
          data: newData
        })
        successCode(res, newData)
      }


      // await this.prisma.brand.create({
      //   data: newData
      // });
    } catch (error) {
      failCode(res, error.message)
    }
  }

}
