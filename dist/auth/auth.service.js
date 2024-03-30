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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
const jwt_1 = require("@nestjs/jwt");
const response_1 = require("../response");
const auth_repository_1 = require("./auth.repository");
const bcrypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
const exception_1 = require("../exception/exception");
let AuthService = class AuthService {
    constructor(jwtService, config, authRepository, mailService) {
        this.jwtService = jwtService;
        this.config = config;
        this.authRepository = authRepository;
        this.mailService = mailService;
        this.prisma = new client_1.PrismaClient();
    }
    async profile(userId) {
        try {
            const checkUser = await this.authRepository.checkUserOrderById(userId);
            if (!checkUser) {
                throw new exception_1.NotFoundException("User không tồn tại!");
            }
            const user = {
                id_user: checkUser.id_user,
                name: checkUser.name,
                email: checkUser.email,
                birthday: checkUser.birthday,
                address: checkUser.address,
                phone: checkUser.phone,
                productItem: checkUser.order
            };
            return user;
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
    async login(res, user) {
        try {
            const checkUser = await this.authRepository.checkEmailUser(user.email);
            if (!checkUser)
                throw new exception_1.NotFoundException('Tài khoản không đúng!');
            if (!checkUser.verifyEmail)
                throw new exception_1.PreconditionFailedException('Email chưa được xác thực!');
            const passwordMatches = await bcrypt.compare(user.password, checkUser.password);
            if (!passwordMatches)
                throw new exception_1.UnauthorizedException('Mật khẩu không đúng!');
            const tokens = await this.getTokens(checkUser);
            await this.updateRtHash(checkUser.id_user, tokens.refreshToken);
            let data = {
                id_user: checkUser.id_user,
                name: checkUser.name,
                email: checkUser.email,
                address: checkUser.address,
                birthday: checkUser.birthday,
                phone: checkUser.phone,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            };
            return data;
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
    async loginAdmin(user) {
        try {
            const checkUser = await this.authRepository.checkEmailUser(user.email);
            if (!checkUser)
                throw new exception_1.NotFoundException('Tài khoản không đúng!');
            if (!checkUser.verifyEmail)
                throw new exception_1.PreconditionFailedException('Email chưa được xác thực!');
            if (!checkUser.role)
                throw new exception_1.ForbiddenException("Tài khoản không được phép truy cập!");
            const passwordMatches = await bcrypt.compare(user.password, checkUser.password);
            if (!passwordMatches)
                throw new exception_1.UnauthorizedException('Mật khẩu không đúng!');
            const tokens = await this.getTokens(checkUser);
            await this.updateRtHash(checkUser.id_user, tokens.refreshToken);
            let data = {
                id_user: checkUser.id_user,
                name: checkUser.name,
                email: checkUser.email,
                address: checkUser.address,
                birthday: checkUser.birthday,
                phone: checkUser.phone,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            };
            return data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new exception_1.CustomException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async signUp(user) {
        try {
            const checkEmail = await this.authRepository.checkEmailUser(user.email);
            if (checkEmail) {
                throw new exception_1.ConflictException('Tài khoản đã tồn tại!');
            }
            if (!user.role) {
                user.role = false;
            }
            if (typeof user.birthday === "string") {
                user.birthday = new Date(user.birthday);
            }
            const hash = await this.hashData(user.password);
            const tokenEmail = this.createToken(user.email, "VERIFY_EMAIL", "3d");
            const newDataSignUp = {
                name: user.name,
                email: user.email,
                password: hash,
                birthday: user.birthday,
                address: user.address,
                phone: user.phone,
                role: user.role,
                verifyEmail: false,
                verifyEmailToken: tokenEmail
            };
            const userSignUp = await this.authRepository.signUp(newDataSignUp);
            await this.sendVerificationEmail(userSignUp);
            const tokens = await this.getTokens(userSignUp);
            await this.updateRtHash(userSignUp.id_user, tokens.refreshToken);
            return this.formatResponse(userSignUp, tokens);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new exception_1.CustomException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async refreshToken(res, user) {
        try {
            const checkUser = await this.authRepository.checkUserById(user.id_user);
            if (!checkUser || !checkUser.hashedRt)
                throw new exception_1.ForbiddenException('Access Denied');
            const rtMatches = await bcrypt.compare(user.refresh_token, checkUser.hashedRt);
            if (!rtMatches)
                throw new exception_1.ForbiddenException('Access Denied');
            const decodedRefreshToken = this.jwtService.decode(user.refresh_token);
            const expirationTimeFrame = 7 * 24 * 60 * 60;
            if (decodedRefreshToken && decodedRefreshToken.iat && Date.now() / 1000 - decodedRefreshToken.iat > expirationTimeFrame) {
                throw new exception_1.ForbiddenException('Refresh token has expired');
            }
            const tokens = await this.getTokens(checkUser);
            await this.updateRtHash(user.id_user, tokens.refreshToken);
            (0, response_1.successCode)(res, tokens);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new exception_1.CustomException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async forgotPassword(res, user) {
        try {
            const checkUser = await this.authRepository.checkEmailUser(user.email);
            if (!checkUser)
                throw new exception_1.NotFoundException('Tài khoản không đúng!');
            const tokenForgot = await this.createTokenForgotPass(user.email, checkUser, res);
            await this.sendVerificationEmail(checkUser, tokenForgot);
            return tokenForgot;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new exception_1.CustomException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async createTokenForgotPass(email, checkUser, res) {
        try {
            if (checkUser.resetPasswordExpire &&
                (new Date().getTime() - checkUser.resetPasswordExpire.getTime()) / 60000 < 15) {
                throw new exception_1.TooManyRequestsException('Email đã được gửi trước đó!');
            }
            else {
                const newTokenPass = this.createToken(email, "FORGOT_PASS", "15m");
                const updateResetPass = await this.prisma.user.update({
                    where: {
                        id_user: checkUser.id_user
                    },
                    data: {
                        resetPasswordToken: newTokenPass,
                        resetPasswordExpire: new Date()
                    }
                });
                if (updateResetPass) {
                    return {
                        resetPasswordToken: updateResetPass.resetPasswordToken,
                        resetPasswordExpire: updateResetPass.resetPasswordExpire
                    };
                }
                else {
                    throw new common_1.HttpException("UPDATE_RESET_PASSWORD_EXPIRE_FAIL", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
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
    async resetPass(res, token, body) {
        try {
            const checkUser = await this.authRepository.checkUserByTokenPass(token);
            if (!checkUser)
                throw new exception_1.NotFoundException('User not found');
            const exp = (new Date().getTime() - checkUser.resetPasswordExpire.getTime()) / 60000;
            if (exp > 15) {
                throw new exception_1.PreconditionFailedException('Reset Password quá thời hạn!');
            }
            const hash = await this.hashData(body.password);
            await this.authRepository.resetPass(hash, checkUser.id_user);
            (0, response_1.successCode)(res, body.password);
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
    async verifyEmail(res, token) {
        try {
            const checkUser = await this.prisma.user.findFirst({
                where: {
                    verifyEmailToken: token
                }
            });
            if (!checkUser)
                throw new exception_1.NotFoundException('Không tìm thấy người dùng!');
            await this.prisma.user.update({
                where: {
                    id_user: checkUser.id_user
                },
                data: {
                    verifyEmail: true,
                    verifyEmailToken: null
                }
            });
            (0, response_1.successCode)(res, '');
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
    async sendVerificationEmail(user, tokenForgot) {
        if (!tokenForgot) {
            if (user && (!user.verifyEmail)) {
                await this.mailService.sendMail({
                    to: user.email,
                    subject: "Welcome",
                    template: './VerifyEmail',
                    context: {
                        token: user.verifyEmailToken
                    }
                });
            }
        }
        else {
            if (tokenForgot && tokenForgot.resetPasswordToken) {
                await this.mailService.sendMail({
                    to: user.email,
                    subject: "Welcome",
                    template: './ForgotPass',
                    context: {
                        token: tokenForgot.resetPasswordToken
                    }
                });
            }
            else {
                throw new exception_1.PreconditionFailedException('Không có token!');
            }
        }
    }
    formatResponse(user, tokens) {
        return {
            id_user: user.id_user,
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            address: user.address,
            phone: user.phone,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        };
    }
    hashData(data) {
        return bcrypt.hash(data, 10);
    }
    createToken(data, secret, expiresIn) {
        return this.jwtService.sign({ data: data }, { secret: this.config.get(secret), expiresIn: expiresIn });
    }
    async getTokens(payload) {
        const data = {
            id_user: payload.id_user,
            name: payload.name,
            email: payload.email,
        };
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(data, {
                secret: this.config.get('AT_SECRET'),
                expiresIn: '3d',
            }),
            this.jwtService.signAsync(data, {
                secret: this.config.get('RT_SECRET'),
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken: at,
            refreshToken: rt
        };
    }
    async updateRtHash(userId, rt) {
        try {
            const hash = await this.hashData(rt);
            await this.prisma.user.update({
                where: {
                    id_user: userId
                },
                data: {
                    hashedRt: hash
                }
            });
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
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        auth_repository_1.AuthRepository,
        mailer_1.MailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map