import { BrandService } from './brand.service';
import { CreateBrandInterface } from './interface';
export declare class BrandController {
    private readonly brandService;
    constructor(brandService: BrandService);
    createBrand(res: any, body: CreateBrandInterface): Promise<void>;
    removeBrand(res: any, id_brand: string): Promise<void>;
    getBrandList(res: any): Promise<void>;
    updateBrand(id_brand: string, res: any, body: CreateBrandInterface): Promise<void>;
    findBrand(res: any, id: string): Promise<void>;
}
