import { Injectable } from '@nestjs/common';
import { CreateProductInterface } from './dto';
import { PrismaClient } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ColorInterface, StorageInterface } from './interface';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {

  constructor(private cloudinary: CloudinaryService,
    private productRepository: ProductRepository) { }

  prisma = new PrismaClient();

  async create(createProduct: CreateProductInterface, res: any, files: Array<Express.Multer.File>) {

    const checkCategoryBrand = await this.productRepository.findCategoryBrand(createProduct.id_brand, createProduct.id_category)

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
      const checkProduct = await this.productRepository.findAll()

      if (!!!checkProduct.length) {
        errCode(res, checkProduct, "Không tìm thấy product nào!")
      }

      successCode(res, checkProduct)
    } catch (error) {
      failCode(res, error.message)
    }
  }

  async findOne(id: number, res: any) {
    const checkProduct = await this.productRepository.findOne(id);

    if (!checkProduct) {
      errCode(res, checkProduct, "Không tìm thấy sản phẩm")
      return
    }

    successCode(res, checkProduct)
  }

  async updateThumbnail(id: number, img: Express.Multer.File, res: any) {
    try {
      const checkProduct = await this.productRepository.findOne(id)

      if (!checkProduct) {
        errCode(res, checkProduct, "Không tìm thấy product!")
        return
      }

      await this.cloudinary.deleteImage(checkProduct.thumbnail)

      const imgUrl: string = await this.cloudinary.uploadImage(img)

      await this.productRepository.updateThumbnail(id, imgUrl)

      successCode(res, imgUrl)

    } catch (error) {

    }
  }

  async deleteProduct(id_product: number, res: any) {
    const checkProduct = await this.productRepository.findOne(id_product)

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

    await this.productRepository.deleteProduct(id_product)


    successCode(res, '')


  }




}
