import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { BrandDto } from "./dto";

@Injectable()
export class BrandRepository {
    prisma = new PrismaClient();

    async createBrand(userData: BrandDto) {
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

    async updateBrand(data: BrandDto, id: number) {
        return this.prisma.brand.update({
            where: {
                id_brand: id
            },
            data: data
        })
    }

}