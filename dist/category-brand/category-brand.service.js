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
const category_brand_repository_1 = require("./category-brand.repository");
const exception_1 = require("../exception/exception");
let CategoryBrandService = class CategoryBrandService {
    constructor(categoryBrandRepository) {
        this.categoryBrandRepository = categoryBrandRepository;
        this.prisma = new client_1.PrismaClient();
    }
    async create(categoryBrand) {
        try {
            const checkCategoryBrand = await this.categoryBrandRepository.findByBrandCategory(categoryBrand);
            if (checkCategoryBrand) {
                throw new exception_1.ConflictException('Loại sản phẩm trong hãng đã tồn tại!');
            }
            const newData = await this.categoryBrandRepository.createCategoryBrand(categoryBrand);
            return newData;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new exception_1.InternalServerErrorException(error.message);
            }
        }
    }
    async findAll() {
        try {
            const checkCategoryBrand = await this.categoryBrandRepository.findAll();
            return checkCategoryBrand;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new exception_1.InternalServerErrorException(error.message);
            }
        }
    }
    async deleteCategoryBrand(id_categoryBrand) {
        try {
            const checkCategory = await this.categoryBrandRepository.findCategoryBrand(id_categoryBrand);
            if (!checkCategory) {
                throw new exception_1.NotFoundException('Không tìm thấy loại sản phẩm trong hãng!');
            }
            await this.categoryBrandRepository.deleteCategoryBrand(id_categoryBrand);
            return checkCategory;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new exception_1.InternalServerErrorException(error.message);
            }
        }
    }
    async updateCategoryBrand(categoryBrand, id_categoryBrand) {
        try {
            const checkCategory = await this.categoryBrandRepository.findCategoryBrand(id_categoryBrand);
            if (!checkCategory) {
                throw new exception_1.NotFoundException('Không tìm thấy loại sản phẩm trong hãng!');
            }
            const foundCategoryBrand = await this.categoryBrandRepository.findByBrandCategory(categoryBrand);
            if (foundCategoryBrand) {
                throw new exception_1.ConflictException('Loại sản phẩm trong hãng đã tồn tại!');
            }
            const newData = await this.categoryBrandRepository.updateCategoryBrand(categoryBrand, id_categoryBrand);
            return newData;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new exception_1.InternalServerErrorException(error.message);
            }
        }
    }
};
CategoryBrandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_brand_repository_1.CategoryBrandRepository])
], CategoryBrandService);
exports.CategoryBrandService = CategoryBrandService;
//# sourceMappingURL=category-brand.service.js.map