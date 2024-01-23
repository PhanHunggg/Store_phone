import { CategoryBrandInterface } from './interface';
import { PrismaClient } from '@prisma/client';
import { CategoryBrandRepository } from './category-brand.repository';
export declare class CategoryBrandService {
    private categoryBrandRepository;
    constructor(categoryBrandRepository: CategoryBrandRepository);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    create(categoryBrand: CategoryBrandInterface, res: any): Promise<void>;
    findAll(res: any): Promise<void>;
    deleteCategoryBrand(id_categoryBrand: number, res: any): Promise<void>;
    updateCategoryBrand(res: any, categoryBrand: CategoryBrandInterface, id_categoryBrand: number): Promise<void>;
}
