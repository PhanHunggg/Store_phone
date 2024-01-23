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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const swagger_1 = require("@nestjs/swagger");
const interface_1 = require("../category-brand/interface");
const public_decorator_1 = require("../common/decorators/public.decorator");
const create_product_1 = require("./interface/create-product");
const update_product_1 = require("./interface/update-product");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getEquivalentProduct(res, id_categoryBrand) {
        return this.productService.getEquivalentProduct(res, +id_categoryBrand);
    }
    findByCategoryBrand(res, body) {
        return this.productService.findByCategoryBrand(res, body);
    }
    findProductByBrand(res, id_brand) {
        return this.productService.findProductByBrand(res, +id_brand);
    }
    getProductList(res) {
        return this.productService.getProductList(res);
    }
    findProduct(id, res) {
        return this.productService.findProduct(+id, res);
    }
    createProduct(createProductDto, res) {
        return this.productService.createProduct(createProductDto, res);
    }
    updateProduct(id, file, res, body) {
        return this.productService.updateProduct(res, +id, body);
    }
    deleteProduct(id_product, res) {
        return this.productService.deleteProduct(+id_product, res);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/equivalent-product/:id_categoryBrand'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Param)('id_categoryBrand')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getEquivalentProduct", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/find-product-category-brand'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, interface_1.CategoryBrandInterface]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findByCategoryBrand", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)("/find-product-brand/:id_brand"),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Param)('id_brand')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findProductByBrand", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/product-list'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductList", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/find-product/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findProduct", null);
__decorate([
    (0, common_1.Post)('/create-product'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_1.CreateProductReqInterface, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Patch)('/update-product/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, update_product_1.UpdateProductReqInterface]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('/delete-product/:id_product'),
    __param(0, (0, common_1.Param)('id_product')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteProduct", null);
ProductController = __decorate([
    (0, swagger_1.ApiTags)("Product"),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map