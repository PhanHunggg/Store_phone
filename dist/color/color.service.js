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
exports.ColorService = void 0;
const common_1 = require("@nestjs/common");
const color_repository_1 = require("./color.repository");
const exception_1 = require("../exception/exception");
let ColorService = class ColorService {
    constructor(colorRepository) {
        this.colorRepository = colorRepository;
    }
    async create(createColorDto) {
        try {
            const color = await this.colorRepository.create(createColorDto);
            return color;
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
    async getColorList() {
        try {
            const checkColor = await this.colorRepository.getColorList();
            return checkColor;
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
    async remove(id) {
        try {
            const checkColor = await this.colorRepository.findColor(id);
            if (!checkColor) {
                throw new common_1.NotFoundException('Color not found');
            }
            await this.colorRepository.deleteColor(id);
            return checkColor;
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
    async findColor(id) {
        try {
            const color = await this.colorRepository.findColor(id);
            return color;
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
ColorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [color_repository_1.ColorRepository])
], ColorService);
exports.ColorService = ColorService;
//# sourceMappingURL=color.service.js.map