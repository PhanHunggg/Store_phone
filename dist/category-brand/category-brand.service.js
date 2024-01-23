"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryBrandService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const response_1 = require("../response");
const category_brand_repository_1 = require("./category-brand.repository");
let CategoryBrandService = class CategoryBrandService {
    constructor(categoryBrandRepository) {
        this.categoryBrandRepository = categoryBrandRepository;
        this.prisma = new client_1.PrismaClient();
    }
    async create(categoryBrand, res) {
        try {
            const newData = {
                id_brand: categoryBrand.id_brand,
                id_category: categoryBrand.id_category
            };
            await this.categoryBrandRepository.createCategoryBrand(newData);
            (0, response_1.successCode)(res, newData);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async findAll(res) {
        try {
            const checkCategoryBrand = await this.categoryBrandRepository.findAll();
            if (!!!checkCategoryBrand.length) {
                (0, response_1.errCode)(res, checkCategoryBrand, "Không tìm thấy loại sản phẩm!");
                return;
            }
            (0, response_1.successCode)(res, checkCategoryBrand);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async deleteCategoryBrand(id_categoryBrand, res) {
        try {
            const checkCategory = await this.categoryBrandRepository.findCategoryBrand(id_categoryBrand);
            if (!checkCategory) {
                (0, response_1.errCode)(res, checkCategory, "Không tìm thấy loại sản phẩm theo hãng!");
                return;
            }
            await this.categoryBrandRepository.deleteCategoryBrand(id_categoryBrand);
            (0, response_1.successCode)(res, '');
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async updateCategoryBrand(res, categoryBrand, id_categoryBrand) {
        try {
            const checkCategory = await this.categoryBrandRepository.findCategoryBrand(id_categoryBrand);
            if (!checkCategory) {
                (0, response_1.errCode)(res, id_categoryBrand, "Không tìm thấy loại sản phẩm!");
                return;
            }
            const newData = categoryBrand;
            await this.categoryBrandRepository.updateCategoryBrand(newData, id_categoryBrand);
            (0, response_1.successCode)(res, newData);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
};
CategoryBrandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_brand_repository_1.CategoryBrandRepository])
], CategoryBrandService);
exports.CategoryBrandService = CategoryBrandService;
//# sourceMappingURL=category-brand.service.js.map