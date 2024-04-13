import { CategoryBrandService } from './category-brand.service';
import { CategoryBrandInterface } from './interface';
import { Response } from 'express';
export declare class CategoryBrandController {
    private readonly categoryBrandService;
    constructor(categoryBrandService: CategoryBrandService);
    create(createCategoryBrandDto: CategoryBrandInterface, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    deleteCategoryBrand(id_categoryBrand: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateCategoryBrand(id_categoryBrand: string, categoryBrand: CategoryBrandInterface, res: Response): Promise<Response<any, Record<string, any>>>;
}
