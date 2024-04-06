import { Brand } from '@prisma/client';
import { BrandInterface, CreateBrandInterface } from './interface';
import { BrandRepository } from './brand.repository';
export declare class BrandService {
    private brandRepository;
    constructor(brandRepository: BrandRepository);
    createBrand(res: any, brand: CreateBrandInterface): Promise<BrandInterface>;
    removeBrand(res: any, id: number): Promise<Brand>;
    getBrandList(res: any): Promise<Brand[]>;
    updateBrand(res: any, brand: CreateBrandInterface, id_brand: number): Promise<void>;
    findBrand(res: any, id: number): Promise<void>;
}
