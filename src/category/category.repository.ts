import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateCategoryInterface } from "./interface";

@Injectable()
export class CategoryRepository {
    prisma = new PrismaClient();

    async createCategory(data: CreateCategoryInterface) {
        return this.prisma.category.create({ data });
    }
    async getCategoryList() {
        return this.prisma.category.findMany()
    }

    async findCategory(id: number) {
        return this.prisma.category.findUnique({
            where: {
                id_category: id
            }
        })
    }

    async updateCategory(id: number, data: CreateCategoryInterface) {
        return this.prisma.category.update({
            where: {
                id_category: id
            },
            data
        })
    }

    async deleteCategory(id) {
        return this.prisma.category.delete({
            where: {
                id_category: id
            }
        })
    }
}