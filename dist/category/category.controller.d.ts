import { CategoryService } from './category.service';
import { CreateCategoryInterface } from './interface';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    createCategory(createCategoryDto: CreateCategoryInterface, res: any): Promise<void>;
    updateCategory(id_category: string, createCategoryDto: CreateCategoryInterface, res: any): Promise<void>;
    getCategoryList(res: any): Promise<void>;
    findCategory(id: string, res: any): Promise<void>;
    deleteCategory(id_category: string, res: any): Promise<void>;
}
