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
exports.BrandService = void 0;
const common_1 = require("@nestjs/common");
const response_1 = require("../response");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const brand_repository_1 = require("./brand.repository");
let BrandService = class BrandService {
    constructor(cloudinary, brandRepository) {
        this.cloudinary = cloudinary;
        this.brandRepository = brandRepository;
    }
    async createBrand(res, brand) {
        try {
            const newData = {
                name: brand.name,
                img: brand.banner
            };
            await this.brandRepository.createBrand(newData);
            (0, response_1.successCode)(res, newData);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async removeBrand(res, id) {
        const checkBrand = await this.brandRepository.findBrandById(id);
        if (!checkBrand) {
            (0, response_1.errCode)(res, id, "Không tìm thấy hãng");
            return;
        }
        await this.cloudinary.deleteImage(checkBrand.img);
        await this.brandRepository.deleteBrand(id);
        (0, response_1.successCode)(res, "");
    }
    async getBrandList(res) {
        const checkBrand = await this.brandRepository.getBrandList();
        (0, response_1.successCode)(res, checkBrand);
    }
    async updateBrand(res, brand, id_brand) {
        try {
            const checkBrand = await this.brandRepository.findBrandById(id_brand);
            if (!checkBrand) {
                (0, response_1.errCode)(res, id_brand, "Không tìm thấy hãng");
                return;
            }
            const newData = {
                name: brand.name,
                img: brand.banner
            };
            await this.brandRepository.updateBrand(newData, id_brand);
            (0, response_1.successCode)(res, newData);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async findBrand(res, id) {
        try {
            const brand = await this.brandRepository.findBrandById(id);
            if (!brand) {
                (0, response_1.errCode)(res, id, "Không tìm thấy brand!");
                return;
            }
            (0, response_1.successCode)(res, brand);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
};
BrandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        brand_repository_1.BrandRepository])
], BrandService);
exports.BrandService = BrandService;
//# sourceMappingURL=brand.service.js.map