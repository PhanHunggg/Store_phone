"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const product_repository_1 = require("./product.repository");
const category_brand_repository_1 = require("../category-brand/category-brand.repository");
const brand_repository_1 = require("../brand/brand.repository");
const category_repository_1 = require("../category/category.repository");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    (0, common_1.Module)({
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService, cloudinary_service_1.CloudinaryService, product_repository_1.ProductRepository, category_brand_repository_1.CategoryBrandRepository, brand_repository_1.BrandRepository, category_repository_1.CategoryRepository, category_brand_repository_1.CategoryBrandRepository]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map