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
exports.ColorController = void 0;
const common_1 = require("@nestjs/common");
const color_service_1 = require("./color.service");
const swagger_1 = require("@nestjs/swagger");
const interface_1 = require("./interface");
const response_1 = require("../response");
const exception_1 = require("../exception/exception");
let ColorController = class ColorController {
    constructor(colorService) {
        this.colorService = colorService;
    }
    async create(createColorDto, res) {
        try {
            const create = await this.colorService.create(createColorDto);
            return (0, response_1.successCode)(res, create);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new exception_1.InternalServerErrorException(error.message);
            }
        }
    }
    async getColorList(res) {
        try {
            const colors = await this.colorService.getColorList();
            return (0, response_1.successCode)(res, colors);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new exception_1.InternalServerErrorException(error.message);
            }
        }
    }
    async remove(id, res) {
        try {
            const checkColor = await this.colorService.remove(+id);
            return (0, response_1.successCode)(res, checkColor);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new exception_1.InternalServerErrorException(error.message);
            }
        }
    }
    async findColor(id, res) {
        try {
            const color = await this.colorService.findColor(+id);
            return (0, response_1.successCode)(res, color);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new exception_1.InternalServerErrorException(error.message);
            }
        }
    }
};
__decorate([
    (0, common_1.Post)('/create-color'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interface_1.ColorInterface, Object]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/color-list'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "getColorList", null);
__decorate([
    (0, common_1.Delete)('/delete-color/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/find-color/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "findColor", null);
ColorController = __decorate([
    (0, swagger_1.ApiTags)("Color"),
    (0, common_1.Controller)('color'),
    __metadata("design:paramtypes", [color_service_1.ColorService])
], ColorController);
exports.ColorController = ColorController;
//# sourceMappingURL=color.controller.js.map