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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const interface_1 = require("./interface");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../common/decorators/public.decorator");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    createCategory(createCategoryDto, res) {
        return this.categoryService.createCategory(res, createCategoryDto);
    }
    updateCategory(id_category, createCategoryDto, res) {
        return this.categoryService.updateCategory(res, createCategoryDto, +id_category);
    }
    getCategoryList(res) {
        return this.categoryService.getCategoryList(res);
    }
    findCategory(id, res) {
        return this.categoryService.findCategory(res, +id);
    }
    deleteCategory(id_category, res) {
        return this.categoryService.deleteCategory(+id_category, res);
    }
};
__decorate([
    (0, common_1.Post)("/create-category"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interface_1.CreateCategoryInterface, Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Put)("/update-category/:id_category"),
    __param(0, (0, common_1.Param)('id_category')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, interface_1.CreateCategoryInterface, Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Get)('/category-list'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getCategoryList", null);
__decorate([
    (0, common_1.Get)('/find-category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findCategory", null);
__decorate([
    (0, common_1.Delete)('/delete-category/:id_category'),
    __param(0, (0, common_1.Param)('id_category')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "deleteCategory", null);
CategoryController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiTags)("Category"),
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map