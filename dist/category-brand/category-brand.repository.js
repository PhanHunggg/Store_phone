"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryBrandRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let CategoryBrandRepository = class CategoryBrandRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async findCategoryBrand(id) {
        return await this.prisma.categoryBrand.findUnique({
            where: {
                id_categoryBrand: id
            }
        });
    }
    async findAll() {
        return await this.prisma.categoryBrand.findMany();
    }
    async findByBrandCategory(brandCategory) {
        return await this.prisma.categoryBrand.findFirst({
            where: {
                id_brand: brandCategory.id_brand,
                id_category: brandCategory.id_category
            }
        });
    }
    async createCategoryBrand(data) {
        return await this.prisma.categoryBrand.create({
            data
        });
    }
    async deleteCategoryBrand(id) {
        return await this.prisma.categoryBrand.delete({
            where: {
                id_categoryBrand: id
            }
        });
    }
    async updateCategoryBrand(data, id) {
        return await this.prisma.categoryBrand.update({
            where: {
                id_categoryBrand: id
            },
            data
        });
    }
};
CategoryBrandRepository = __decorate([
    (0, common_1.Injectable)()
], CategoryBrandRepository);
exports.CategoryBrandRepository = CategoryBrandRepository;
//# sourceMappingURL=category-brand.repository.js.map