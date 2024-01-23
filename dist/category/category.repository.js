"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let CategoryRepository = class CategoryRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async createCategory(data) {
        return this.prisma.category.create({ data });
    }
    async getCategoryList() {
        return this.prisma.category.findMany();
    }
    async findCategory(id) {
        return this.prisma.category.findUnique({
            where: {
                id_category: id
            }
        });
    }
    async updateCategory(id, data) {
        return this.prisma.category.update({
            where: {
                id_category: id
            },
            data
        });
    }
    async deleteCategory(id) {
        return this.prisma.category.delete({
            where: {
                id_category: id
            }
        });
    }
    async findPhoneCategory() {
        return this.prisma.category.findFirst({
            where: {
                name: "Phone"
            }
        });
    }
};
CategoryRepository = __decorate([
    (0, common_1.Injectable)()
], CategoryRepository);
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category.repository.js.map