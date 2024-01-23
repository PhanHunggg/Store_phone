"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let BrandRepository = class BrandRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async createBrand(userData) {
        return this.prisma.brand.create({ data: userData });
    }
    async findBrandById(id) {
        return this.prisma.brand.findUnique({ where: { id_brand: id } });
    }
    ;
    async deleteBrand(id) {
        return this.prisma.brand.delete({ where: { id_brand: id } });
    }
    async getBrandList() {
        return this.prisma.brand.findMany();
    }
    async updateBrand(data, id) {
        return this.prisma.brand.update({
            where: {
                id_brand: id
            },
            data: data
        });
    }
};
BrandRepository = __decorate([
    (0, common_1.Injectable)()
], BrandRepository);
exports.BrandRepository = BrandRepository;
//# sourceMappingURL=brand.repository.js.map