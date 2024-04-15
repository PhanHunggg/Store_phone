import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateCategoryDTO } from "src/category/dto/ctrate-category.dto";

@Injectable()
export class CategoryRepository {
    prisma = new PrismaClient();

    async createCategory(data: CreateCategoryDTO) {
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

    async findCategoryByName(name: string) {
        return this.prisma.category.findFirst({
            where: {
                name: {
                    equals: name,
                },
            },
        });
    }

    async updateCategory(id: number, data: CreateCategoryDTO) {
        return this.prisma.category.update({
            where: {
                id_category: id
            },
            data
        })
    }

    async deleteCategory(id: number) {
        return this.prisma.category.delete({
            where: {
                id_category: id
            }
        })
    }

    async findPhoneCategory() {
        return this.prisma.category.findFirst({
            where: {
                name: "Phone"
            }
        })
    }
}