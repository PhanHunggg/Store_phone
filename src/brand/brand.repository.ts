import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { BrandInterface } from "./interface";

@Injectable()
export class BrandRepository {
    prisma = new PrismaClient();

    async createBrand(userData: BrandInterface) {
        return this.prisma.brand.create({ data: userData });
    }

    async findBrandById(id: number) {
        return this.prisma.brand.findUnique({ where: { id_brand: id } })
    };

    async deleteBrand(id: number) {
        return this.prisma.brand.delete({ where: { id_brand: id } });
    }

    async getBrandList() {
        return this.prisma.brand.findMany()
    }

    async updateBrand(data: BrandInterface, id: number) {
        return this.prisma.brand.update({
            where: {
                id_brand: id
            },
            data: data
        })
    }

}