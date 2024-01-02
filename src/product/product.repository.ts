import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UpdateProductInterface } from "./interface/update-product";
import { CreateProductInterface } from "./interface/create-product";
import { CategoryBrandInterface } from "src/category-brand/interface";

@Injectable()
export class ProductRepository {
    prisma = new PrismaClient();

    async getProductList() {
        return await this.prisma.product.findMany({
            include: {
                categoryBrandMapping: {
                    include: {
                        brand: {
                            select: {
                                name: true
                            }
                        },
                        category: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });
    }

    async findProductByCategoryBrand(id: number) {
        return await this.prisma.product.findMany({
            where: {
                id_categoryBrand: id
            }
        })
    }


    async findProduct(id: number) {
        return await this.prisma.product.findUnique({
            where: {
                id_product: id
            },
            include: {
                categoryBrandMapping: {
                    include: {
                        brand: {
                            select: {
                                name: true
                            }
                        },
                        category: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
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