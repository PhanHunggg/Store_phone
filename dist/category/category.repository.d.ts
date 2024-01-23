import { PrismaClient } from "@prisma/client";
import { CreateCategoryInterface } from "./interface";
export declare class CategoryRepository {
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createCategory(data: CreateCategoryInterface): Promise<{
        id_category: number;
        name: string;
    }>;
    getCategoryList(): Promise<{
        id_category: number;
        name: string;
    }[]>;
    findCategory(id: number): Promise<{
        id_category: number;
        name: string;
    }>;
    updateCategory(id: number, data: CreateCategoryInterface): Promise<{
        id_category: number;
        name: string;
    }>;
    deleteCategory(id: any): Promise<{
        id_category: number;
        name: string;
    }>;
    findPhoneCategory(): Promise<{
        id_category: number;
        name: string;
    }>;
}
