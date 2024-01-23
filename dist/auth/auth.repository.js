"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let AuthRepository = class AuthRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async signUp(userData) {
        return this.prisma.user.create({ data: userData });
    }
    async checkEmailUser(email) {
        return this.prisma.user.findFirst({ where: { email: email } });
    }
    ;
    async checkUserById(id) {
        return this.prisma.user.findUnique({ where: { id_user: id } });
    }
    ;
    async checkUserByTokenPass(token) {
        return await this.prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
            }
        });
    }
    async resetPass(password, id) {
        return await this.prisma.user.update({
            where: {
                id_user: id
            },
            data: {
                password: password,
                resetPasswordToken: null,
                resetPasswordExpire: null
            }
        });
    }
};
AuthRepository = __decorate([
    (0, common_1.Injectable)()
], AuthRepository);
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map