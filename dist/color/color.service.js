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
const response_1 = require("../response");
let ColorService = class ColorService {
    constructor(colorRepository) {
        this.colorRepository = colorRepository;
    }
    async create(createColorDto, res) {
        try {
            await this.colorRepository.create(createColorDto);
            (0, response_1.successCode)(res, createColorDto);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async getColorList(res) {
        try {
            const checkColor = await this.colorRepository.getColorList();
            (0, response_1.successCode)(res, checkColor);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async remove(id, res) {
        try {
            const checkColor = await this.colorRepository.findColor(id);
            if (!checkColor) {
                (0, response_1.errCode)(res, checkColor, "Không tìm thấy màu!");
                return;
            }
            await this.colorRepository.deleteColor(id);
            (0, response_1.successCode)(res, '');
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async findColor(res, id) {
        try {
            const color = await this.colorRepository.findColor(id);
            (0, response_1.successCode)(res, color);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
};
ColorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [color_repository_1.ColorRepository])
], ColorService);
exports.ColorService = ColorService;
//# sourceMappingURL=color.service.js.map