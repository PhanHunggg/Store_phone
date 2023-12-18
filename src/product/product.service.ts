import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductRepository } from './product.repository';
import { CategoryBrandRepository } from 'src/category-brand/category-brand.repository';
import { CategoryBrandInterface } from 'src/category-brand/interface';
import { CreateProductInterface, CreateProductReqInterface } from './interface/create-product';
import { UpdateProductInterface, UpdateProductReqInterface } from './interface/update-product';

@Injectable()
export class ProductService {

  constructor(private cloudinary: CloudinaryService,
    private productRepository: ProductRepository,) { }

  prisma = new PrismaClient();



  async createProduct(createProduct: CreateProductReqInterface, res: any) {
    try {
      const checkCategoryBrand = await this.productRepository.findCategoryBrand(createProduct.brand, createProduct.categories)

      if (!checkCategoryBrand) {
        errCode(res, createProduct, "Không tìm thấy loại và hãng sản phẩm.")
        return
      }

      let thumbnail: string
      let arrImg: any[]

      if (Array.isArray(createProduct.img)) {
        thumbnail = createProduct.img[0].url
        arrImg = createProduct.img.splice(1)
      }

      if (createProduct.new_release === "1") {
        createProduct.new_release = true
      } else {
        createProduct.new_release = false
      }

      const data: CreateProductInterface = {
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
        img: arrImg,
        storage: createProduct.storage,
        color: createProduct.color,
      }

      const newData = await this.productRepository.createProduct(data)

      successCode(res, newData)
    } catch (error) {
      failCode(res, error.message)

    }
  }

  async getProductList(res: any) {
    try {
      const checkProduct = await this.productRepository.getProductList()

      if (!!!checkProduct.length) {
        errCode(res, checkProduct, "Không tìm thấy product nào!")
        return
      }

      successCode(res, checkProduct)
    } catch (error) {
      failCode(res, error.message)
    }
  }

  async findProduct(id: number, res: any) {
    const checkProduct = await this.productRepository.findProduct(id);

    if (!checkProduct) {
      errCode(res, checkProduct, "Không tìm thấy sản phẩm")
      return
    }

    successCode(res, checkProduct)
  }

  async updateThumbnail(id: number, img: Express.Multer.File, res: any) {
    try {
      const checkProduct = await this.productRepository.findProduct(id)

      if (!checkProduct) {
        errCode(res, checkProduct, "Không tìm thấy product!")
        return
      }


      const imgUrl: string = await this.cloudinary.uploadImage(img)

      await this.productRepository.updateThumbnail(id, imgUrl)

      successCode(res, imgUrl)

    } catch (error) {

    }
  }

  async deleteProduct(id_product: number, res: any) {
    const checkProduct = await this.productRepository.findProduct(id_product)

    if (!checkProduct) {
      errCode(res, "", "Không tìm thấy sản phẩm")
      return
    }


    await this.productRepository.deleteProduct(id_product)


    successCode(res, '')


  }

  async updateProduct(res, id: number, product: UpdateProductReqInterface) {

    const checkProduct = await this.productRepository.findProduct(id);
    if (!checkProduct) {
      errCode(res, checkProduct, "Không tìm thấy sản phẩm")
      return
    }

    const checkCategoryBrand = await this.productRepository.findCategoryBrand(product.brand, product.categories)

    if (!checkCategoryBrand) {
      errCode(res, product, "Không tìm thấy loại và hãng sản phẩm.")
      return
    }

    const newData: UpdateProductInterface = {
      id_categoryBrand: checkCategoryBrand.id_categoryBrand,
      name: product.name,
      chip: product.chip,
      price: product.price,
      original_price: product.original_price,
      battery: product.battery,
      quantity: product.quantity,
      new_release: product.new_release,
      screen: product.screen,
      front_camera: product.front_camera,
      rear_camera: product.rear_camera,
      storage: product.storage,
      color: product.color
    }
    await this.productRepository.updateProduct(id, newData)
    successCode(res, newData)
  }


  async getEquivalentProduct(res: any, id: number) {
    try {

      const productList = await this.productRepository.getEquivalentProduct(id)

      if (!!!productList.length) {
        errCode(res, productList, "Không tìm thấy Product!")
        return
      }

      successCode(res, productList)
    } catch (error) {
      failCode(res, error.message)
    }
  }


  async findByCategoryBrand(res: any, brandCategory: CategoryBrandInterface) {

    try {
      const checkCategoryBrand = await this.productRepository.findByIdBrandIdCategory(brandCategory)

      if (!checkCategoryBrand) {
        errCode(res, checkCategoryBrand, "Không tìm thấy hãng và loại sản phẩm!")
        return
      }

      const productList = await this.productRepository.getEquivalentProduct(checkCategoryBrand.id_categoryBrand)

      if (!!!productList.length) {
        errCode(res, productList, "Không tìm thấy Product!")
        return
      }

      successCode(res, productList)

    } catch (error) {
      failCode(res, error.message)
    }

  }
}
