import { PrismaClient } from "@prisma/client";
import { CategoryBrandInterface } from "./interface";
export declare class CategoryBrandRepository {
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findCategoryBrand(id: number): Promise<{
        id_categoryBrand: number;
        id_brand: number;
        id_category: number;
    }>;
    findAll(): Promise<{
        id_categoryBrand: number;
        id_brand: number;
        id_category: number;
    }[]>;
    findByBrandCategory(categoryBrand: CategoryBrandInterface): Promise<{
        id_categoryBrand: number;
        id_brand: number;
        id_category: number;
    }>;
    createCategoryBrand(data: CategoryBrandInterface): Promise<{
        id_categoryBrand: number;
        id_brand: number;
        id_category: number;
    }>;
    deleteCategoryBrand(id: number): Promise<{
        id_categoryBrand: number;
        id_brand: number;
        id_category: number;
    }>;
    updateCategoryBrand(data: CategoryBrandInterface, id: number): Promise<{
        id_categoryBrand: number;
        id_brand: number;
        id_category: number;
    }>;
}
