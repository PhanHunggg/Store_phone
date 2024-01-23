import { CategoryBrandService } from './category-brand.service';
import { CategoryBrandInterface } from './interface';
export declare class CategoryBrandController {
    private readonly categoryBrandService;
    constructor(categoryBrandService: CategoryBrandService);
    create(createCategoryBrandDto: CategoryBrandInterface, res: any): Promise<void>;
    findAll(res: any): Promise<void>;
    deleteCategoryBrand(id_categoryBrand: string, res: any): Promise<void>;
    updateCategoryBrand(id_categoryBrand: string, categoryBrand: CategoryBrandInterface, res: any): Promise<void>;
}
