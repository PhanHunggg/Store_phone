import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateBrandInterface } from './interface';
import { BrandRepository } from './brand.repository';
export declare class BrandService {
    private cloudinary;
    private brandRepository;
    constructor(cloudinary: CloudinaryService, brandRepository: BrandRepository);
    createBrand(res: any, brand: CreateBrandInterface): Promise<void>;
    removeBrand(res: any, id: number): Promise<void>;
    getBrandList(res: any): Promise<void>;
    updateBrand(res: any, brand: CreateBrandInterface, id_brand: number): Promise<void>;
    findBrand(res: any, id: number): Promise<void>;
}
