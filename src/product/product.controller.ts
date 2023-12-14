import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Response, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { successCode } from 'src/response';
import { CreateProductInterface } from './dto';


@ApiTags("Product")
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('/create-product')
  @UseInterceptors(FilesInterceptor('img', 10))
  createProduct(@Body() createProductDto: CreateProductInterface, @Response() res: any, @UploadedFiles() files: Array<Express.Multer.File>): Promise<void> {
    return this.productService.create(createProductDto, res, files);
  }

  @Get('/product-list')
  findAll(@Response() res: any): Promise<void> {
    return this.productService.findAll(res);
  }

  @Get('/find-product/:id')
  findOne(@Param('id') id: string, @Response() res: any) {
    return this.productService.findOne(+id, res);
  }

  @UseInterceptors(FileInterceptor('img'))
  @Patch('/update-thumbnail-product/:id')
  updateThumbnail(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Response() res: any) {
    return this.productService.updateThumbnail(+id, file,res);
  }

  @Delete('/delete-product/:id_product')
  deleteProduct(@Param('id_product') id_product: string, @Response() res: any) {
    return this.productService.deleteProduct(+id_product, res);
  }

}
