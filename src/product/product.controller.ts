import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Response, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { successCode } from 'src/response';
import { CategoryBrandInterface } from 'src/category-brand/interface';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateProductReqInterface } from './interface/create-product';
import { UpdateProductReqInterface } from './interface/update-product';


@ApiTags("Product")
@Controller('product')
export class ProductController {

  constructor(private readonly productService: ProductService) { }

  @Post('/create-product')
  createProduct(@Body() createProductDto: CreateProductReqInterface, @Response() res: any,): Promise<void> {
    return this.productService.createProduct(createProductDto, res);
  }

  @Public()
  @Get('/product-list')
  getProductList(@Response() res: any): Promise<void> {
    return this.productService.getProductList(res);
  }

  @Public()
  @Get('/find-product/:id')
  findProduct(@Param('id') id: string, @Response() res: any) {
    return this.productService.findProduct(+id, res);
  }

  @UseInterceptors(FileInterceptor('img'))
  @Patch('/update-thumbnail-product/:id')
  updateThumbnail(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Response() res: any) {
    return this.productService.updateThumbnail(+id, file, res);
  }

  @Patch('/update-product/:id')
  updateProduct(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Response() res: any, @Body() body: UpdateProductReqInterface) {
    return this.productService.updateProduct(res, +id, body);
  }

  @Delete('/delete-product/:id_product')
  deleteProduct(@Param('id_product') id_product: string, @Response() res: any) {
    return this.productService.deleteProduct(+id_product, res);
  }


  @Public()
  @Get('/equivalent-product/:id_categoryBrand')
  getEquivalentProduct(@Response() res: any, @Param('id_categoryBrand') id_categoryBrand: string) {
    return this.productService.getEquivalentProduct(res, +id_categoryBrand)
  }

  @Public()
  @Get('/find-product-category-brand')
  findByCategoryBrand(@Response() res: any, @Body() body: CategoryBrandInterface) {
    return this.productService.findByCategoryBrand(res, body)
  }


}
