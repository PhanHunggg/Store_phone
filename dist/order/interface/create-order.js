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
exports.CreateOrderInterface = exports.ProductItem = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ProductItem {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "name", type: String }),
    __metadata("design:type", String)
], ProductItem.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "color", type: String }),
    __metadata("design:type", String)
], ProductItem.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "price", type: Number }),
    __metadata("design:type", Number)
], ProductItem.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "storage", type: String }),
    __metadata("design:type", String)
], ProductItem.prototype, "storage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "quantity", type: Number }),
    __metadata("design:type", Number)
], ProductItem.prototype, "quantity", void 0);
exports.ProductItem = ProductItem;
class CreateOrderInterface {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "id_user", type: Number }),
    __metadata("design:type", Number)
], CreateOrderInterface.prototype, "id_user", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "name", type: String }),
    __metadata("design:type", String)
], CreateOrderInterface.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "phone", type: String }),
    __metadata("design:type", String)
], CreateOrderInterface.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "address", type: String }),
    __metadata("design:type", String)
], CreateOrderInterface.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "payment_method", type: String }),
    __metadata("design:type", String)
], CreateOrderInterface.prototype, "payment_method", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "delivery_by", type: String }),
    __metadata("design:type", String)
], CreateOrderInterface.prototype, "delivery_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "total", type: Number }),
    __metadata("design:type", Number)
], CreateOrderInterface.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({ description: 'productItem', type: [ProductItem] }),
    __metadata("design:type", Array)
], CreateOrderInterface.prototype, "productItem", void 0);
exports.CreateOrderInterface = CreateOrderInterface;
//# sourceMappingURL=create-order.js.map