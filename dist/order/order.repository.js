"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let OrderRepository = class OrderRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async findOrderByIdUser(id) {
        return await this.prisma.order.findMany({
            where: {
                id_user: id
            }
        });
    }
    async findOrderById(id) {
        return await this.prisma.order.findUnique({
            where: {
                id_order: id
            }
        });
    }
    async getOrderList() {
        return await this.prisma.order.findMany();
    }
    async deleteOrder(id) {
        return await this.prisma.order.delete({
            where: {
                id_order: id,
            }
        });
    }
    async createOrder(data) {
        return await this.prisma.order.create({
            data
        });
    }
};
OrderRepository = __decorate([
    (0, common_1.Injectable)()
], OrderRepository);
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=order.repository.js.map