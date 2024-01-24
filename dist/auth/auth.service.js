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
const order_repository_1 = require("../order/order.repository");
let AuthService = class AuthService {
    constructor(jwtService, config, authRepository, mailService, orderRepository) {
        this.jwtService = jwtService;
        this.config = config;
        this.authRepository = authRepository;
        this.mailService = mailService;
        this.orderRepository = orderRepository;
        this.prisma = new client_1.PrismaClient();
    }
    async profile(res, userId) {
        try {
            const checkUser = await this.prisma.user.findUnique({
                where: {
                    id_user: userId
                },
                include: {
                    order: true,
                }
            });
            if (!checkUser) {
                (0, response_1.errCode)(res, '', "Không tìm thấy user!");
                return;
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
            (0, response_1.successCode)(res, user);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async login(res, user) {
        try {
            const checkUser = await this.authRepository.checkEmailUser(user.email);
            if (!checkUser) {
                (0, response_1.errCode)(res, user, "Tài khoản không đúng!");
                return;
            }
            const passwordMatches = await bcrypt.compare(user.password, checkUser.password);
            if (!passwordMatches) {
                (0, response_1.errCode)(res, user.password, "Mật khẩu không đúng!");
                return;
            }
            if (!checkUser.verifyEmail) {
                (0, response_1.errCode)(res, checkUser.verifyEmail, "Email chưa được xác thực!");
                return;
            }
            const tokens = await this.getTokens(checkUser);
            await this.updateRtHash(res, checkUser.id_user, tokens.refreshToken);
            let data = checkUser;
            data.accessToken = tokens.accessToken;
            data.refreshToken = tokens.refreshToken;
            (0, response_1.successCode)(res, data, "Đăng nhập thành công");
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async loginAdmin(res, user) {
        try {
            const checkUser = await this.authRepository.checkEmailUser(user.email);
            if (!checkUser) {
                (0, response_1.errCode)(res, user, "Tài khoản không đúng!");
                return;
            }
            if (!checkUser.role) {
                (0, response_1.errCode)(res, user, "Tài khoản không phải admin!");
                return;
            }
            const passwordMatches = await bcrypt.compare(user.password, checkUser.password);
            if (!passwordMatches) {
                (0, response_1.errCode)(res, user.password, "Mật khẩu không đúng!");
                return;
            }
            if (!checkUser.verifyEmail) {
                (0, response_1.errCode)(res, checkUser.verifyEmail, "Email chưa được xác thực!");
                return;
            }
            const tokens = await this.getTokens(checkUser);
            await this.updateRtHash(res, checkUser.id_user, tokens.refreshToken);
            let data = checkUser;
            data.accessToken = tokens.accessToken;
            data.accessToken = tokens.accessToken;
            (0, response_1.successCode)(res, data, "Đăng nhập thành công");
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async signUp(res, user) {
        try {
            const checkEmail = await this.authRepository.checkEmailUser(user.email);
            if (checkEmail) {
                (0, response_1.errCode)(res, user.email, "Email đã tồn tại");
                return;
            }
            if (!user.role) {
                user.role = false;
            }
            if (typeof user.birthday === "string") {
                user.birthday = new Date(user.birthday);
            }
            const hash = await this.hashData(user.password);
            user.password = hash;
            const tokenEmail = this.createToken(user.email, "VERIFY_EMAIL", "3d");
            const newDataSignUp = {
                name: user.name,
                email: user.email,
                password: user.password,
                birthday: user.birthday,
                address: user.address,
                phone: user.phone,
                role: user.role,
                verifyEmail: false,
                verifyEmailToken: tokenEmail
            };
            const userSignUp = await this.authRepository.signUp(newDataSignUp);
            if (userSignUp && (!userSignUp.verifyEmail)) {
                await this.mailService.sendMail({
                    to: newDataSignUp.email,
                    subject: "Welcome",
                    template: './VerifyEmail',
                    context: {
                        token: userSignUp.verifyEmailToken
                    }
                });
            }
            const tokens = await this.getTokens(userSignUp);
            await this.updateRtHash(res, userSignUp.id_user, tokens.refreshToken);
            (0, response_1.successCode)(res, { user, tokens });
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async refreshToken(res, user) {
        try {
            const checkUser = await this.authRepository.checkUserById(user.id_user);
            if (!checkUser || !checkUser.hashedRt)
                throw new common_1.ForbiddenException('Access Denied');
            const rtMatches = await bcrypt.compare(user.refresh_token, checkUser.hashedRt);
            if (!rtMatches)
                throw new common_1.ForbiddenException('Access Denied');
            const decodedRefreshToken = this.jwtService.decode(user.refresh_token);
            const expirationTimeFrame = 7 * 24 * 60 * 60;
            if (decodedRefreshToken && decodedRefreshToken.iat && Date.now() / 1000 - decodedRefreshToken.iat > expirationTimeFrame) {
                throw new common_1.ForbiddenException('Refresh token has expired');
            }
            const tokens = await this.getTokens(checkUser);
            await this.updateRtHash(res, user.id_user, tokens.refreshToken);
            (0, response_1.successCode)(res, tokens);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async forgotPassword(res, user) {
        const checkUser = await this.authRepository.checkEmailUser(user.email);
        if (!checkUser) {
            (0, response_1.errCode)(res, user.email, "Tài khoản không đúng!");
            return;
        }
        const tokenForgot = await this.createTokenForgotPass(user.email, checkUser, res);
        if (tokenForgot && tokenForgot.resetPasswordToken) {
            await this.mailService.sendMail({
                to: checkUser.email,
                subject: "Welcome",
                template: './ForgotPass',
                context: {
                    token: tokenForgot.resetPasswordToken
                }
            });
        }
        else {
            (0, response_1.errCode)(res, tokenForgot, "Không có token!");
            return;
        }
        (0, response_1.successCode)(res, tokenForgot);
    }
    async createTokenForgotPass(email, checkUser, res) {
        if (checkUser.resetPasswordExpire &&
            (new Date().getTime() - checkUser.resetPasswordExpire.getTime()) / 60000 < 15) {
            (0, response_1.errCode)(res, email, "Email đã được gửi trước đó!");
            return;
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
    async resetPass(res, token, body) {
        const checkUser = await this.authRepository.checkUserByTokenPass(token);
        if (!checkUser) {
            (0, response_1.errCode)(res, checkUser, "Không tìm thấy người dùng!");
            return;
        }
        const exp = (new Date().getTime() - checkUser.resetPasswordExpire.getTime()) / 60000;
        if (exp > 15) {
            (0, response_1.errCode)(res, checkUser, "Reset Password quá thời hạn!");
            return;
        }
        const hash = await this.hashData(body.password);
        await this.authRepository.resetPass(hash, checkUser.id_user);
        (0, response_1.successCode)(res, body.password);
    }
    async verifyEmail(res, token) {
        try {
            const checkUser = await this.prisma.user.findFirst({
                where: {
                    verifyEmailToken: token
                }
            });
            if (!checkUser) {
                (0, response_1.errCode)(res, token, "Không tìm thấy người dùng!");
                return;
            }
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
            (0, response_1.failCode)(res, error.message);
        }
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
    async updateRtHash(res, userId, rt) {
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
            (0, response_1.failCode)(res, error.message);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        auth_repository_1.AuthRepository,
        mailer_1.MailerService,
        order_repository_1.OrderRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map