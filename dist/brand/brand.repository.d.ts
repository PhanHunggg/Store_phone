import { PrismaClient } from "@prisma/client";
import { BrandInterface } from "./interface";
export declare class BrandRepository {
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createBrand(userData: BrandInterface): Promise<{
        id_brand: number;
        name: string;
        img: string;
    }>;
    findBrandById(id: number): Promise<{
        id_brand: number;
        name: string;
        img: string;
    }>;
    deleteBrand(id: number): Promise<{
        id_brand: number;
        name: string;
        img: string;
    }>;
    getBrandList(): Promise<{
        id_brand: number;
        name: string;
        img: string;
    }[]>;
    updateBrand(data: BrandInterface, id: number): Promise<{
        id_brand: number;
        name: string;
        img: string;
    }>;
}
