"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let ProductRepository = class ProductRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
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
    async findProductByCategoryBrand(id) {
        return await this.prisma.product.findMany({
            where: {
                id_categoryBrand: id
            }
        });
    }
    async findProduct(id) {
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
        });
    }
    async updateThumbnail(id, thumbnail) {
        return await this.prisma.product.update({
            data: {
                thumbnail,
            },
            where: {
                id_product: id
            }
        });
    }
    async updateProduct(id, data) {
        return await this.prisma.product.update({
            data,
            where: {
                id_product: id
            }
        });
    }
    async deleteProduct(id_product) {
        return await this.prisma.product.delete({
            where: {
                id_product: id_product
            }
        });
    }
    async createProduct(data) {
        return await this.prisma.product.create({ data });
    }
    async getEquivalentProduct(id) {
        return await this.prisma.product.findMany({ where: { id_categoryBrand: id } });
    }
};
ProductRepository = __decorate([
    (0, common_1.Injectable)()
], ProductRepository);
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map