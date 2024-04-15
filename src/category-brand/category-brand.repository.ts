import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateCategoryBrandDTO } from "src/category-brand/dto/create-category-brand.dto";

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

    async findByBrandCategory(categoryBrand: CreateCategoryBrandDTO) {
        return await this.prisma.categoryBrand.findFirst({
            where: {
                id_brand: categoryBrand.id_brand,
                id_category: categoryBrand.id_category
            }
        })
    }

    async createCategoryBrand(data: CreateCategoryBrandDTO) {
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

    async updateCategoryBrand(data: CreateCategoryBrandDTO, id: number) {
        return await this.prisma.categoryBrand.update({
            where: {
                id_categoryBrand: id
            },
            data
        })
    }
}