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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const response_1 = require("../response");
const category_repository_1 = require("./category.repository");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
        this.prisma = new client_1.PrismaClient();
    }
    async createCategory(res, category) {
        try {
            const newData = {
                name: category.name,
            };
            await this.categoryRepository.createCategory(newData);
            (0, response_1.successCode)(res, newData);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async getCategoryList(res) {
        try {
            const checkCategory = await this.categoryRepository.getCategoryList();
            (0, response_1.successCode)(res, checkCategory);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async updateCategory(res, category, id_category) {
        try {
            const checkCategory = await this.categoryRepository.findCategory(id_category);
            if (!checkCategory) {
                (0, response_1.errCode)(res, id_category, "Không tìm thấy loại sản phẩm!");
                return;
            }
            await this.categoryRepository.updateCategory(id_category, category);
            (0, response_1.successCode)(res, category);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async deleteCategory(id_category, res) {
        try {
            const checkCategory = await this.categoryRepository.findCategory(id_category);
            if (!checkCategory) {
                (0, response_1.errCode)(res, checkCategory, "Không tìm thấy loại sản phẩm!");
                return;
            }
            await this.categoryRepository.deleteCategory(id_category);
            (0, response_1.successCode)(res, '');
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async findCategory(res, id) {
        try {
            const category = await this.categoryRepository.findCategory(id);
            if (!category) {
                (0, response_1.errCode)(res, id, "Không tìm thấy category!");
                return;
            }
            (0, response_1.successCode)(res, category);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map