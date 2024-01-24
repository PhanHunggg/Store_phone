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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const order_repository_1 = require("./order.repository");
const response_1 = require("../response");
const product_repository_1 = require("../product/product.repository");
const user_repository_1 = require("../user/user.repository");
let OrderService = class OrderService {
    constructor(orderRepository, productRepository, userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }
    async getOrderList(res) {
        try {
            const checkOrderAll = await this.orderRepository.getOrderList();
            (0, response_1.successCode)(res, checkOrderAll);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async findOrderByIdUser(res, id) {
        try {
            const order = await this.orderRepository.findOrderByIdUser(id);
            if (!order) {
                (0, response_1.errCode)(res, id, "Không tìm thấy order!");
                return;
            }
            (0, response_1.successCode)(res, order);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async createOrder(res, createOrder) {
        const idUser = Number(createOrder.id_user);
        createOrder.id_user = idUser;
        createOrder.total = Number(createOrder.total);
        createOrder.id_user = idUser;
        for (let i = 0; i < createOrder.productItem.length; i++) {
            createOrder.productItem[i].price = Number(createOrder.productItem[i].price);
            createOrder.productItem[i].quantity = Number(createOrder.productItem[i].quantity);
        }
        const checkUser = await this.userRepository.findUser(idUser);
        if (!checkUser) {
            (0, response_1.errCode)(res, checkUser, "Không tìm thấy user!");
            return;
        }
        const currentDate = new Date();
        const newDataOrder = Object.assign(Object.assign({}, createOrder), { created_date: currentDate });
        const order = await this.orderRepository.createOrder(newDataOrder);
        (0, response_1.successCode)(res, order);
    }
    async deleteOrder(res, id) {
        try {
            const checkOrder = await this.orderRepository.findOrderById(id);
            if (!checkOrder) {
                (0, response_1.errCode)(res, checkOrder, "Không tìm thấy order!");
                return;
            }
            await this.orderRepository.deleteOrder(id);
            (0, response_1.successCode)(res, '');
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async findOrderById(res, id) {
        try {
            const checkOrder = await this.orderRepository.findOrderById(id);
            if (!checkOrder) {
                (0, response_1.errCode)(res, checkOrder, "Không tìm thấy order!");
                return;
            }
            (0, response_1.successCode)(res, checkOrder);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_repository_1.OrderRepository,
        product_repository_1.ProductRepository,
        user_repository_1.UserRepository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map