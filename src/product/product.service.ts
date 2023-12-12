import { Injectable } from '@nestjs/common';
import { CreateProductDto, ProductInterface } from './dto';
import { PrismaClient } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ColorInterface, StorageInterface } from './interface';

@Injectable()
export class ProductService {

  constructor(private cloudinary: CloudinaryService) { }

  prisma = new PrismaClient();

  async create(createProduct: CreateProductDto, res: any, files: Array<Express.Multer.File>) {

    const checkCategoryBrand = await this.prisma.categoryBrand.findFirst({
      where: {
        id_brand: Number(createProduct.id_brand),
        id_category: Number(createProduct.id_category)
      }
    })

    if (!checkCategoryBrand) {
      errCode(res, createProduct, "Không tìm thấy loại và hãng sản phẩm.")
      return
    }
    const thumbnail: string = await this.cloudinary.uploadImage(files[0])

    const [, ...remainingFiles] = files;

    const imageUrls = await Promise.all(remainingFiles.map(async file => {
      return await this.cloudinary.uploadImage(file);
    }));

    const imgJsonArray: any[] = imageUrls.map(img => {
      return {
        url: img,
      };
    });

    if (createProduct.new_release === "1") {
      createProduct.new_release = true
    } else {
      createProduct.new_release = false
    }



    const newData = {
      id_categoryBrand: checkCategoryBrand.id_categoryBrand,
      name: createProduct.name,
      thumbnail: thumbnail,
      chip: createProduct.chip,
      price: createProduct.price,
      original_price: createProduct.original_price,
      battery: createProduct.battery,
      quantity: createProduct.quantity,
      new_release: createProduct.new_release,
      screen: createProduct.screen,
      front_camera: createProduct.front_camera,
      rear_camera: createProduct.rear_camera,
      img: imgJsonArray,
      storage: createProduct.storage,
      color: createProduct.color,
    }

    await this.prisma.product.create({
      data: {
        categoryBrandMapping: {
          connect: {
            id_categoryBrand: checkCategoryBrand.id_categoryBrand
          }
        },
        name: createProduct.name,
        thumbnail: thumbnail,
        chip: createProduct.chip,
        price: Number(createProduct.price),
        original_price: Number(createProduct.original_price),
        battery: createProduct.battery,
        quantity: Number(createProduct.quantity),
        new_release: createProduct.new_release,
        screen: createProduct.screen,
        front_camera: createProduct.front_camera,
        rear_camera: createProduct.rear_camera,
        img: imgJsonArray,
        storage: createProduct.storage,
        color: createProduct.color,
      }
    })

    successCode(res, newData)
  }

  async findAll(res: any) {
    try {
      const checkProduct = await this.prisma.product.findMany()

      if (!!!checkProduct.length) {
        errCode(res, checkProduct, "Không tìm thấy product nào!")
      }

      successCode(res, checkProduct)
    } catch (error) {
      failCode(res, error.message)
    }
  }

  async findOne(id: number, res) {
    const checkProduct = await this.prisma.product.findUnique({
      where: {
        id_product: id
      }
    })

    if (!checkProduct) {
      errCode(res, checkProduct, "Không tìm thấy sản phẩm")
      return
    }

    successCode(res, checkProduct)
  }

  update(id: number, updateProductDto) {
    return `This action updates a #${id} product`;
  }

  async deleteProduct(id_product: number, res: any) {
    const checkProduct = await this.prisma.product.findUnique({
      where: {
        id_product: id_product
      }
    })

    if (!checkProduct) {
      errCode(res, "", "Không tìm thấy sản phẩm")
      return
    }


    await this.cloudinary.deleteImage(checkProduct.thumbnail)

    if (Array.isArray(checkProduct.img)) {
      checkProduct.img.forEach(async (element: { url: string }) => {
        await this.cloudinary.deleteImage(element.url)
      });
    }

    await this.prisma.product.delete({
      where: {
        id_product: id_product
      }
    })


    successCode(res, '')


  }




}
