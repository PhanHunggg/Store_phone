import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import {
  UpdateProductInterface,
} from './interface/update-product';
import { successCode } from 'src/response';
import { Response } from 'express';
import { InternalServerErrorException } from 'src/exception/exception';
import { Product } from '@prisma/client';
import { CreateCategoryBrandDTO } from 'src/category-brand/dto/create-category-brand.dto';
import { CreateProductDTO } from 'src/product/dto/create-product.dto';
import { UpdateProductDTO } from 'src/product/dto/update-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get('/equivalent-product/:id_categoryBrand')
  async getEquivalentProduct(
    @Res() res: Response,
    @Param('id_categoryBrand') id_categoryBrand: string,
  ): Promise<Response> {
    try {
      const result: Product[] = await this.productService.getEquivalentProduct(
        +id_categoryBrand,
      );

      if (result) return successCode(res, result);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Public()
  @Get('/find-product-category-brand')
  async findByCategoryBrand(
    @Res() res: Response,
    @Body() body: CreateCategoryBrandDTO,
  ): Promise<Response> {
    try {
      const result: Product[] = await this.productService.findByCategoryBrand(
        body,
      );

      if (result) return successCode(res, result);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Public()
  @Get('/find-product-brand/:id_brand')
  async findProductByBrand(
    @Res() res: Response,
    @Param('id_brand') id_brand: string,
  ): Promise<Response> {
    try {
      const result: Product[] = await this.productService.findProductByBrand(
        +id_brand,
      );

      if (result) return successCode(res, result);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Public()
  @Get('/product-list')
  async getProductList(@Res() res: Response): Promise<Response> {
    try {
      const result: Product[] = await this.productService.getProductList();

      if (result) return successCode(res, result);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Public()
  @Get('/find-product/:id')
  async findProduct(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    try {
      const result: Product = await this.productService.findProduct(+id);

      if (result) return successCode(res, result);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Post('/create-product')
  async createProduct(
    @Body() createProductDto: CreateProductDTO,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const result: Product = await this.productService.createProduct(
        createProductDto,
      );

      if (result) return successCode(res, result);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Patch('/update-product/:id')
  async updateProduct(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() body: UpdateProductDTO,
  ): Promise<Response> {
    try {
      const result: Product =
        await this.productService.updateProduct(+id, body);
      if (result) return successCode(res, result);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Delete('/delete-product/:id_product')
  async deleteProduct(
    @Param('id_product') id_product: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const result: Product = await this.productService.deleteProduct(
        +id_product,
      );
      return successCode(res, result);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
