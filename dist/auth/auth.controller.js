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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../common/decorators/public.decorator");
const login_1 = require("./interface/login");
const sign_up_1 = require("./interface/sign-up");
const forgot_password_1 = require("./interface/forgot-password");
const reset_pass_1 = require("./interface/reset-pass");
const get_current_user_id_decorator_1 = require("../common/decorators/get-current-user-id.decorator");
const response_1 = require("../response");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async profile(userId, res) {
        try {
            const user = await this.authService.profile(userId);
            return (0, response_1.successCode)(res, user);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async login(res, body) {
        try {
            const user = await this.authService.login(res, body);
            return (0, response_1.successCode)(res, user);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async loginAdmin(res, body) {
        try {
            const user = await this.authService.loginAdmin(body);
            return (0, response_1.successCode)(res, user);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async signUp(res, body) {
        try {
            const user = await this.authService.signUp(body);
            return (0, response_1.createCode)(res, user, "Đăng ký người dùng thành công!");
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async forgotPassword(res, body) {
        try {
            const tokenForgot = await this.authService.forgotPassword(res, body);
            return (0, response_1.successCode)(res, tokenForgot);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    refreshToken(res, body) {
        return this.authService.refreshToken(res, body);
    }
    resetPass(res, token, body) {
        return this.authService.resetPass(res, token, body);
    }
    verifyEmail(res, token) {
        return this.authService.verifyEmail(res, token);
    }
};
__decorate([
    (0, common_1.Get)('/profile'),
    __param(0, (0, get_current_user_id_decorator_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profile", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_1.LoginInterface]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("/admin-login"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_1.LoginInterface]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginAdmin", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("/sign-up"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, sign_up_1.SignUpReqInterface]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/forgot-password'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, forgot_password_1.ForgotPasswordInterface]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/refresh-token'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)('/reset-password/:token'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('token')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, reset_pass_1.ResetPassInterface]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPass", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)('/verify-email/:token'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyEmail", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)("Auth"),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map