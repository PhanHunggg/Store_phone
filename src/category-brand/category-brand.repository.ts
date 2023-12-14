import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateCategoryBrandDto } from "./dto/create-category-brand.dto";

@Injectable()
export class CategoryBrandRepository {
    prisma = new PrismaClient();

    async findCategoryBrand(id: number) {
        return await this.prisma.categoryBrand.findUnique({
            where: {
                id_categoryBrand: id
            }
        })
    }

    async createCategoryBrand(data: CreateCategoryBrandDto) {
        return await this.prisma.categoryBrand.create({
            data
        });
    }

    async findAll() {
        return await this.prisma.categoryBrand.findMany()

    }

    async deleteCategoryBrand(id: number) {
        return await this.prisma.categoryBrand.delete({
            where: {
                id_categoryBrand: id
            }
        })
    }

    async updateCategoryBrand(data: CreateCategoryBrandDto, id: number) {
        return await this.prisma.categoryBrand.update({
            where: {
                id_categoryBrand: id
            },
            data
        })
    }
}