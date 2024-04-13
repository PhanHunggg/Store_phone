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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryBrandController = void 0;
const common_1 = require("@nestjs/common");
const category_brand_service_1 = require("./category-brand.service");
const interface_1 = require("./interface");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../common/decorators/public.decorator");
const response_1 = require("../response");
const exception_1 = require("../exception/exception");
let CategoryBrandController = class CategoryBrandController {
    constructor(categoryBrandService) {
        this.categoryBrandService = categoryBrandService;
    }
    async create(createCategoryBrandDto, res) {
        try {
            const categoryBrand = await this.categoryBrandService.create(createCategoryBrandDto);
            return (0, response_1.successCode)(res, categoryBrand);
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
    async findAll(res) {
        try {
            const checkCategoryBrand = await this.categoryBrandService.findAll();
            return (0, response_1.successCode)(res, checkCategoryBrand);
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
    async deleteCategoryBrand(id_categoryBrand, res) {
        try {
            const categoryBrand = await this.categoryBrandService.deleteCategoryBrand(+id_categoryBrand);
            return (0, response_1.successCode)(res, categoryBrand, "Xoa thanh cong");
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
    async updateCategoryBrand(id_categoryBrand, categoryBrand, res) {
        try {
            const updateCategoryBrand = await this.categoryBrandService.updateCategoryBrand(categoryBrand, +id_categoryBrand);
            return (0, response_1.successCode)(res, updateCategoryBrand, "Cap nhat thanh cong");
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
__decorate([
    (0, common_1.Post)('/create-categoryBrand'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interface_1.CategoryBrandInterface, Object]),
    __metadata("design:returntype", Promise)
], CategoryBrandController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/categoryBrand-list'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryBrandController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)('/delete-categoryBrand/:id_categoryBrand'),
    __param(0, (0, common_1.Param)('id_categoryBrand')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoryBrandController.prototype, "deleteCategoryBrand", null);
__decorate([
    (0, common_1.Put)('/update-categoryBrand/:id_categoryBrand'),
    __param(0, (0, common_1.Param)('id_categoryBrand')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, interface_1.CategoryBrandInterface, Object]),
    __metadata("design:returntype", Promise)
], CategoryBrandController.prototype, "updateCategoryBrand", null);
CategoryBrandController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiTags)('CategoryBrand'),
    (0, common_1.Controller)('category-brand'),
    __metadata("design:paramtypes", [category_brand_service_1.CategoryBrandService])
], CategoryBrandController);
exports.CategoryBrandController = CategoryBrandController;
//# sourceMappingURL=category-brand.controller.js.map