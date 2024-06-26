import { HttpException, Injectable } from '@nestjs/common';
import { CategoryBrand, PrismaClient, Product } from '@prisma/client';
import { ProductRepository } from './product.repository';
import {
  CreateProductInterface,
} from './interface/create-product';
import {
  UpdateProductInterface,
} from './interface/update-product';
import { BrandRepository } from 'src/brand/brand.repository';
import { CategoryRepository } from 'src/category/category.repository';
import { CategoryBrandRepository } from 'src/category-brand/category-brand.repository';
import {
  InternalServerErrorException,
  NotFoundException,
} from 'src/exception/exception';
import { CreateCategoryBrandDTO } from 'src/category-brand/dto/create-category-brand.dto';
import { CreateProductDTO } from 'src/product/dto/create-product.dto';
import { UpdateProductDTO } from 'src/product/dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private brandRepository: BrandRepository,
    private categoryRepository: CategoryRepository,
    private categoryBrandRepository: CategoryBrandRepository,
  ) { }

  prisma = new PrismaClient();

  async createProduct(
    createProduct: CreateProductDTO,
  ): Promise<Product> {
    try {
      const categoryBrand: CreateCategoryBrandDTO = {
        id_brand: createProduct.brand,
        id_category: createProduct.categories,
      };

      const checkCategoryBrand: CategoryBrand =
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

      const newData: Product = await this.productRepository.createProduct(data);

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

  async deleteProduct(id_product: number): Promise<Product> {
    const checkProduct = await this.productRepository.findProduct(id_product);
    const userDeleted = checkProduct
    if (!checkProduct) {
      throw new NotFoundException('Không tìm thấy sản phẩm!');
    }

    await this.productRepository.deleteProduct(id_product);

    return userDeleted;
  }

  async updateProduct(id: number, product: UpdateProductDTO): Promise<Product> {
    try {
      const checkProduct: Product = await this.productRepository.findProduct(id);
      if (!checkProduct) {
        throw new NotFoundException('Không tìm thấy sản phẩm!');
      }

      const categoryBrand: CreateCategoryBrandDTO = {
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
      const newProduct: Product = await this.productRepository.updateProduct(id, newData);
      
      return newProduct;
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
    brandCategory: CreateCategoryBrandDTO,
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

      const brandCategory: CreateCategoryBrandDTO = {
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
