import { CreateCategoryInterface } from './interface';
import { PrismaClient } from '@prisma/client';
import { CategoryRepository } from './category.repository';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createCategory(res: any, category: CreateCategoryInterface): Promise<void>;
    getCategoryList(res: any): Promise<void>;
    updateCategory(res: any, category: CreateCategoryInterface, id_category: number): Promise<void>;
    deleteCategory(id_category: number, res: any): Promise<void>;
    findCategory(res: any, id: number): Promise<void>;
}
