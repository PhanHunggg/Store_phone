import { PrismaClient } from "@prisma/client";
import { ColorInterface } from "./interface";
export declare class ColorRepository {
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    create(data: ColorInterface): Promise<{
        id_color: number;
        name: string;
        hex: string;
    }>;
    getColorList(): Promise<{
        id_color: number;
        name: string;
        hex: string;
    }[]>;
    findColor(id: number): Promise<{
        id_color: number;
        name: string;
        hex: string;
    }>;
    deleteColor(id: number): Promise<{
        id_color: number;
        name: string;
        hex: string;
    }>;
}
