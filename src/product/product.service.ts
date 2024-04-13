import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductRepository } from './product.repository';
import { CategoryBrandInterface } from 'src/category-brand/interface';
import {
  CreateProductInterface,
  CreateProductReqInterface,
} from './interface/create-product';
import {
  UpdateProductInterface,
  UpdateProductReqInterface,
} from './interface/update-product';
import { BrandRepository } from 'src/brand/brand.repository';
import { CategoryRepository } from 'src/category/category.repository';
import { CategoryBrandRepository } from 'src/category-brand/category-brand.repository';
import {
  InternalServerErrorException,
  NotFoundException,
} from 'src/exception/exception';

@Injectable()
export class ProductService {
  constructor(
    private cloudinary: CloudinaryService,
    private productRepository: ProductRepository,
    private brandRepository: BrandRepository,
    private categoryRepository: CategoryRepository,
    private categoryBrandRepository: CategoryBrandRepository,
  ) {}

  prisma = new PrismaClient();

  async createProduct(
    createProduct: CreateProductReqInterface,
  ): Promise<Product> {
    try {
      const categoryBrand: CategoryBrandInterface = {
        id_brand: createProduct.brand,
        id_category: createProduct.categories,
      };

      const checkCategoryBrand =
        await this.categoryBrandRepository.findByBrandCategory(categoryBrand);

      if (!checkCategoryBrand) {
        throw new NotFoundException('Không tìm thấy loại và hãng sản phẩm.');
      }

      let thumbnail: string;
      let arrImg: any[];

      if (Array.isArray(createProduct.img)) {
        thumbnail = createProduct.img[0].url;
        arrImg = createProduct.img.splice(1);
      }

      const data: CreateProductInterface = {
        categoryBrandMapping: {
          connect: {
            id_categoryBrand: checkCategoryBrand.id_categoryBrand,
          },
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
      };

      const newData = await this.productRepository.createProduct(data);

      return newData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async getProductList(): Promise<Product[]> {
    try {
      const checkProduct = await this.productRepository.getProductList();

      return checkProduct;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async findProduct(id: number): Promise<Product> {
    try {
      const checkProduct = await this.productRepository.findProduct(id);

      if (!checkProduct) {
        throw new NotFoundException('Không tìm thấy sản phẩm!');
      }

      return checkProduct;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async updateThumbnail(id: number, img: Express.Multer.File, res: any) {
    try {
      const checkProduct = await this.productRepository.findProduct(id);

      if (!checkProduct) {
        errCode(res, checkProduct, 'Không tìm thấy product!');
        return;
      }

      const imgUrl: string = await this.cloudinary.uploadImage(img);

      await this.productRepository.updateThumbnail(id, imgUrl);

      successCode(res, imgUrl);
    } catch (error) {}
  }

  async deleteProduct(id_product: number): Promise<Product> {
    const checkProduct = await this.productRepository.findProduct(id_product);
    const userDeleted = checkProduct
    if (!checkProduct) {
      throw new NotFoundException('Không tìm thấy sản phẩm!');
    }

    await this.productRepository.deleteProduct(id_product);

    return userDeleted;
  }

  async updateProduct(id: number, product: UpdateProductReqInterface): Promise<UpdateProductInterface> {
    try {
      const checkProduct = await this.productRepository.findProduct(id);
      if (!checkProduct) {
        throw new NotFoundException('Không tìm thấy sản phẩm!');
      }

      const categoryBrand: CategoryBrandInterface = {
        id_brand: product.brand,
        id_category: product.categories,
      };

      const checkCategoryBrand =
        await this.categoryBrandRepository.findByBrandCategory(categoryBrand);

      if (!checkCategoryBrand) {
        throw new NotFoundException('Không tìm thấy loại và hãng sản phẩm.');
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
        color: product.color,
      };
      await this.productRepository.updateProduct(id, newData);
      return newData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async getEquivalentProduct(id: number): Promise<Product[]> {
    try {
      const productList = await this.productRepository.getEquivalentProduct(id);

      if (!!!productList.length) {
        throw new NotFoundException('Không tìm thấy Product!');
      }

      return productList;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async findByCategoryBrand(
    brandCategory: CategoryBrandInterface,
  ): Promise<Product[]> {
    try {
      const checkCategoryBrand =
        await this.categoryBrandRepository.findByBrandCategory(brandCategory);

      if (!checkCategoryBrand) {
        throw new NotFoundException('Không tìm thấy hãng và loại sản phẩm!');
      }

      const productList = await this.productRepository.getEquivalentProduct(
        checkCategoryBrand.id_categoryBrand,
      );

      if (!!!productList.length) {
        throw new NotFoundException('Không tìm thấy Product!');
      }

      return productList;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async findProductByBrand(id_brand: number): Promise<Product[]> {
    try {
      const checkBrand = await this.brandRepository.findBrandById(id_brand);

      if (!checkBrand) {
        throw new NotFoundException('Không tìm thấy hãng!');
      }

      const checkCategory = await this.categoryRepository.findPhoneCategory();

      if (!checkCategory) {
        throw new NotFoundException('Không tìm thấy loại sản phẩm!');
      }

      const brandCategory: CategoryBrandInterface = {
        id_brand: checkBrand.id_brand,
        id_category: checkCategory.id_category,
      };

      const checkCategoryBrand =
        await this.categoryBrandRepository.findByBrandCategory(brandCategory);

      if (!checkCategoryBrand) {
        throw new NotFoundException('Không tìm thấy loại và hãng sản phẩm!');
      }

      const productList =
        await this.productRepository.findProductByCategoryBrand(
          checkCategoryBrand.id_categoryBrand,
        );

      if (!productList) {
        throw new NotFoundException('Không tìm thấy danh sách sản phẩm!');
      }

      return productList;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
