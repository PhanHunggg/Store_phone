import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateProduct, UpdateProduct } from "./dto";

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

    async updateProduct(id: number, data: UpdateProduct) {
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

    async createProduct(data: CreateProduct) {
        return await this.prisma.product.create({ data })
    }
}