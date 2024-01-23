import { PrismaClient } from "@prisma/client";
import { UpdateProductInterface } from "./interface/update-product";
import { CreateProductInterface } from "./interface/create-product";
export declare class ProductRepository {
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getProductList(): Promise<({
        categoryBrandMapping: {
            brand: {
                name: string;
            };
            category: {
                name: string;
            };
        } & {
            id_categoryBrand: number;
            id_brand: number;
            id_category: number;
        };
    } & {
        id_product: number;
        id_categoryBrand: number;
        name: string;
        thumbnail: string;
        chip: string;
        price: number;
        original_price: number;
        battery: string;
        quantity: number;
        new_release: boolean;
        screen: string;
        front_camera: string;
        rear_camera: string;
        img: import(".prisma/client").Prisma.JsonValue;
        storage: import(".prisma/client").Prisma.JsonValue;
        color: import(".prisma/client").Prisma.JsonValue;
    })[]>;
    findProductByCategoryBrand(id: number): Promise<{
        id_product: number;
        id_categoryBrand: number;
        name: string;
        thumbnail: string;
        chip: string;
        price: number;
        original_price: number;
        battery: string;
        quantity: number;
        new_release: boolean;
        screen: string;
        front_camera: string;
        rear_camera: string;
        img: import(".prisma/client").Prisma.JsonValue;
        storage: import(".prisma/client").Prisma.JsonValue;
        color: import(".prisma/client").Prisma.JsonValue;
    }[]>;
    findProduct(id: number): Promise<{
        categoryBrandMapping: {
            brand: {
                name: string;
            };
            category: {
                name: string;
            };
        } & {
            id_categoryBrand: number;
            id_brand: number;
            id_category: number;
        };
    } & {
        id_product: number;
        id_categoryBrand: number;
        name: string;
        thumbnail: string;
        chip: string;
        price: number;
        original_price: number;
        battery: string;
        quantity: number;
        new_release: boolean;
        screen: string;
        front_camera: string;
        rear_camera: string;
        img: import(".prisma/client").Prisma.JsonValue;
        storage: import(".prisma/client").Prisma.JsonValue;
        color: import(".prisma/client").Prisma.JsonValue;
    }>;
    updateThumbnail(id: number, thumbnail: string): Promise<{
        id_product: number;
        id_categoryBrand: number;
        name: string;
        thumbnail: string;
        chip: string;
        price: number;
        original_price: number;
        battery: string;
        quantity: number;
        new_release: boolean;
        screen: string;
        front_camera: string;
        rear_camera: string;
        img: import(".prisma/client").Prisma.JsonValue;
        storage: import(".prisma/client").Prisma.JsonValue;
        color: import(".prisma/client").Prisma.JsonValue;
    }>;
    updateProduct(id: number, data: UpdateProductInterface): Promise<{
        id_product: number;
        id_categoryBrand: number;
        name: string;
        thumbnail: string;
        chip: string;
        price: number;
        original_price: number;
        battery: string;
        quantity: number;
        new_release: boolean;
        screen: string;
        front_camera: string;
        rear_camera: string;
        img: import(".prisma/client").Prisma.JsonValue;
        storage: import(".prisma/client").Prisma.JsonValue;
        color: import(".prisma/client").Prisma.JsonValue;
    }>;
    deleteProduct(id_product: number): Promise<{
        id_product: number;
        id_categoryBrand: number;
        name: string;
        thumbnail: string;
        chip: string;
        price: number;
        original_price: number;
        battery: string;
        quantity: number;
        new_release: boolean;
        screen: string;
        front_camera: string;
        rear_camera: string;
        img: import(".prisma/client").Prisma.JsonValue;
        storage: import(".prisma/client").Prisma.JsonValue;
        color: import(".prisma/client").Prisma.JsonValue;
    }>;
    createProduct(data: CreateProductInterface): Promise<{
        id_product: number;
        id_categoryBrand: number;
        name: string;
        thumbnail: string;
        chip: string;
        price: number;
        original_price: number;
        battery: string;
        quantity: number;
        new_release: boolean;
        screen: string;
        front_camera: string;
        rear_camera: string;
        img: import(".prisma/client").Prisma.JsonValue;
        storage: import(".prisma/client").Prisma.JsonValue;
        color: import(".prisma/client").Prisma.JsonValue;
    }>;
    getEquivalentProduct(id: number): Promise<{
        id_product: number;
        id_categoryBrand: number;
        name: string;
        thumbnail: string;
        chip: string;
        price: number;
        original_price: number;
        battery: string;
        quantity: number;
        new_release: boolean;
        screen: string;
        front_camera: string;
        rear_camera: string;
        img: import(".prisma/client").Prisma.JsonValue;
        storage: import(".prisma/client").Prisma.JsonValue;
        color: import(".prisma/client").Prisma.JsonValue;
    }[]>;
}
