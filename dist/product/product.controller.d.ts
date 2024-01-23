/// <reference types="multer" />
import { ProductService } from './product.service';
import { CategoryBrandInterface } from 'src/category-brand/interface';
import { CreateProductReqInterface } from './interface/create-product';
import { UpdateProductReqInterface } from './interface/update-product';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getEquivalentProduct(res: any, id_categoryBrand: string): Promise<void>;
    findByCategoryBrand(res: any, body: CategoryBrandInterface): Promise<void>;
    findProductByBrand(res: any, id_brand: string): Promise<void>;
    getProductList(res: any): Promise<void>;
    findProduct(id: string, res: any): Promise<void>;
    createProduct(createProductDto: CreateProductReqInterface, res: any): Promise<void>;
    updateProduct(id: string, file: Express.Multer.File, res: any, body: UpdateProductReqInterface): Promise<void>;
    deleteProduct(id_product: string, res: any): Promise<void>;
}
