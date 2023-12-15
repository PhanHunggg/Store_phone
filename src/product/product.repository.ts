import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateProductInterface, UpdateProductInterface } from "./interface";

@Injectable()
export class ProductRepository {
    prisma = new PrismaClient();

    async findCategoryBrand(id_brand: number, id_category: number) {
        return await this.prisma.categoryBrand.findFirst({
            where: {
                id_brand: Number(id_brand),
                id_category: Number(id_category)
            }
        })
    }

    async findAll() {
        return await this.prisma.product.findMany()
    }

    async findOne(id: number) {
        return await this.prisma.product.findUnique({
            where: {
                id_product: id
            }
        })

    }

    async updateThumbnail(id: number, thumbnail: string) {
        return await this.prisma.product.update({
            data: {
                thumbnail,
            },
            where: {
                id_product: id
            }
        })

    }

    async updateProduct(id: number, data: UpdateProductInterface) {
        return await this.prisma.product.update({
            data,
            where: {
                id_product: id
            }
        })
    }

    async deleteProduct(id_product: number) {
        return await this.prisma.product.delete({
            where: {
                id_product: id_product
            }
        })
    }

    async createProduct(data: CreateProductInterface) {
        return await this.prisma.product.create({ data })
    }

    async getEquivalentProduct(id: number) {
        return await this.prisma.product.findMany({ where: { id_categoryBrand: id } })
    }
}