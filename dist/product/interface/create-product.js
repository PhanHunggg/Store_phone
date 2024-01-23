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
exports.CreateProductInterface = exports.CreateProductReqInterface = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class Storage {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "name", type: String }),
    __metadata("design:type", String)
], Storage.prototype, "name", void 0);
class Color {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "name", type: String }),
    __metadata("design:type", String)
], Color.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "hex", type: String }),
    __metadata("design:type", String)
], Color.prototype, "hex", void 0);
class Img {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "url", type: String }),
    __metadata("design:type", String)
], Img.prototype, "url", void 0);
class CreateProductReqInterface {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: "brand", type: Number }),
    __metadata("design:type", Number)
], CreateProductReqInterface.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: "categories", type: Number }),
    __metadata("design:type", Number)
], CreateProductReqInterface.prototype, "categories", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "name", type: String }),
    __metadata("design:type", String)
], CreateProductReqInterface.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "chip", type: String }),
    __metadata("design:type", String)
], CreateProductReqInterface.prototype, "chip", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: "price", type: Number }),
    __metadata("design:type", Number)
], CreateProductReqInterface.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: "original_price", type: Number }),
    __metadata("design:type", Number)
], CreateProductReqInterface.prototype, "original_price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "battery", type: String }),
    __metadata("design:type", String)
], CreateProductReqInterface.prototype, "battery", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: "quantity", type: Number }),
    __metadata("design:type", Number)
], CreateProductReqInterface.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ description: "new_release", type: Boolean }),
    __metadata("design:type", Boolean)
], CreateProductReqInterface.prototype, "new_release", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "screen", type: String }),
    __metadata("design:type", String)
], CreateProductReqInterface.prototype, "screen", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "front_camera", type: String }),
    __metadata("design:type", String)
], CreateProductReqInterface.prototype, "front_camera", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "rear_camera", type: String }),
    __metadata("design:type", String)
], CreateProductReqInterface.prototype, "rear_camera", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({ description: 'productItem', type: [Img] }),
    __metadata("design:type", Array)
], CreateProductReqInterface.prototype, "img", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({ description: 'productItem', type: [Storage] }),
    __metadata("design:type", Array)
], CreateProductReqInterface.prototype, "storage", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({ description: 'productItem', type: [Color] }),
    __metadata("design:type", Array)
], CreateProductReqInterface.prototype, "color", void 0);
exports.CreateProductReqInterface = CreateProductReqInterface;
class CreateProductInterface {
}
exports.CreateProductInterface = CreateProductInterface;
//# sourceMappingURL=create-product.js.map