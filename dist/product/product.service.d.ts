/// <reference types="multer" />
import { PrismaClient } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductRepository } from './product.repository';
import { CategoryBrandInterface } from 'src/category-brand/interface';
import { CreateProductReqInterface } from './interface/create-product';
import { UpdateProductReqInterface } from './interface/update-product';
import { BrandRepository } from 'src/brand/brand.repository';
import { CategoryRepository } from 'src/category/category.repository';
import { CategoryBrandRepository } from 'src/category-brand/category-brand.repository';
export declare class ProductService {
    private cloudinary;
    private productRepository;
    private brandRepository;
    private categoryRepository;
    private categoryBrandRepository;
    constructor(cloudinary: CloudinaryService, productRepository: ProductRepository, brandRepository: BrandRepository, categoryRepository: CategoryRepository, categoryBrandRepository: CategoryBrandRepository);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createProduct(createProduct: CreateProductReqInterface, res: any): Promise<void>;
    getProductList(res: any): Promise<void>;
    findProduct(id: number, res: any): Promise<void>;
    updateThumbnail(id: number, img: Express.Multer.File, res: any): Promise<void>;
    deleteProduct(id_product: number, res: any): Promise<void>;
    updateProduct(res: any, id: number, product: UpdateProductReqInterface): Promise<void>;
    getEquivalentProduct(res: any, id: number): Promise<void>;
    findByCategoryBrand(res: any, brandCategory: CategoryBrandInterface): Promise<void>;
    findProductByBrand(res: any, id_brand: number): Promise<void>;
}
