/// <reference types="express" />
import { BrandService } from './brand.service';
import { CreateBrandInterface } from './interface';
export declare class BrandController {
    private readonly brandService;
    constructor(brandService: BrandService);
    createBrand(res: any, body: CreateBrandInterface): Promise<import("express").Response<any, Record<string, any>>>;
    removeBrand(res: any, id_brand: string): Promise<import("express").Response<any, Record<string, any>>>;
    getBrandList(res: any): Promise<import("express").Response<any, Record<string, any>>>;
    updateBrand(id_brand: string, res: any, body: CreateBrandInterface): Promise<void>;
    findBrand(res: any, id: string): Promise<void>;
}
