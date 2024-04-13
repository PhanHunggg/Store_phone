import { CategoryBrandInterface } from './interface';
import { CategoryBrand, PrismaClient } from '@prisma/client';
import { CategoryBrandRepository } from './category-brand.repository';
export declare class CategoryBrandService {
    private categoryBrandRepository;
    constructor(categoryBrandRepository: CategoryBrandRepository);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    create(categoryBrand: CategoryBrandInterface): Promise<CategoryBrand>;
    findAll(): Promise<CategoryBrand[]>;
    deleteCategoryBrand(id_categoryBrand: number): Promise<CategoryBrand>;
    updateCategoryBrand(categoryBrand: CategoryBrandInterface, id_categoryBrand: number): Promise<CategoryBrand>;
}
