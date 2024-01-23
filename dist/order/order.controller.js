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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const swagger_1 = require("@nestjs/swagger");
const create_order_1 = require("./interface/create-order");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    getOrderList(res) {
        return this.orderService.getOrderList(res);
    }
    createOrder(res, body) {
        return this.orderService.createOrder(res, body);
    }
    findOrderById(res, id) {
        return this.orderService.findOrderById(res, +id);
    }
    findOrderByIdUser(res, id_user) {
        return this.orderService.findOrderByIdUser(res, +id_user);
    }
    deleteOrder(res, id_order) {
        return this.orderService.deleteOrder(res, +id_order);
    }
};
__decorate([
    (0, common_1.Get)('/order-list'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrderList", null);
__decorate([
    (0, common_1.Post)("/create-order"),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_order_1.CreateOrderInterface]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('/find-order/:id'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findOrderById", null);
__decorate([
    (0, common_1.Get)('/find-order-user/:id_user'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Param)('id_user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findOrderByIdUser", null);
__decorate([
    (0, common_1.Delete)('/delete-order/:id_order'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Param)('id_order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "deleteOrder", null);
OrderController = __decorate([
    (0, swagger_1.ApiTags)("Order"),
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map