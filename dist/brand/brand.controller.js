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
exports.BrandController = void 0;
const common_1 = require("@nestjs/common");
const brand_service_1 = require("./brand.service");
const swagger_1 = require("@nestjs/swagger");
const interface_1 = require("./interface");
const public_decorator_1 = require("../common/decorators/public.decorator");
const response_1 = require("../response");
let BrandController = class BrandController {
    constructor(brandService) {
        this.brandService = brandService;
    }
    async createBrand(res, body) {
        try {
            const brand = await this.brandService.createBrand(res, body);
            return (0, response_1.successCode)(res, brand);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    removeBrand(res, id_brand) {
        return this.brandService.removeBrand(res, +id_brand);
    }
    getBrandList(res) {
        return this.brandService.getBrandList(res);
    }
    updateBrand(id_brand, res, body) {
        return this.brandService.updateBrand(res, body, +id_brand);
    }
    findBrand(res, id) {
        return this.brandService.findBrand(res, +id);
    }
};
__decorate([
    (0, common_1.Post)("/create-brand"),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, interface_1.CreateBrandInterface]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "createBrand", null);
__decorate([
    (0, common_1.Delete)('/delete-brand/:id_brand'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Param)('id_brand')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "removeBrand", null);
__decorate([
    (0, common_1.Get)('/brand-list'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "getBrandList", null);
__decorate([
    (0, common_1.Put)("/update-brand/:id_brand"),
    __param(0, (0, common_1.Param)('id_brand')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, interface_1.CreateBrandInterface]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "updateBrand", null);
__decorate([
    (0, common_1.Get)('/find-brand/:id'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "findBrand", null);
BrandController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiTags)("Brand"),
    (0, common_1.Controller)('brand'),
    __metadata("design:paramtypes", [brand_service_1.BrandService])
], BrandController);
exports.BrandController = BrandController;
//# sourceMappingURL=brand.controller.js.map