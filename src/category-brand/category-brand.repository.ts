import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CategoryBrandInterface } from "./interface";

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

    async findAll() {
        return await this.prisma.categoryBrand.findMany()
    }

    async findByIdBrandIdCategory(brandCategory: CategoryBrandInterface) {
        return await this.prisma.categoryBrand.findFirst({
            where: {
                id_brand: brandCategory.id_brand,
                id_category: brandCategory.id_category
            }
        })
    }

    async createCategoryBrand(data: CategoryBrandInterface) {
        return await this.prisma.categoryBrand.create({
            data
        });
    }



    async deleteCategoryBrand(id: number) {
        return await this.prisma.categoryBrand.delete({
            where: {
                id_categoryBrand: id
            }
        })
    }

    async updateCategoryBrand(data: CategoryBrandInterface, id: number) {
        return await this.prisma.categoryBrand.update({
            where: {
                id_categoryBrand: id
            },
            data
        })
    }
}