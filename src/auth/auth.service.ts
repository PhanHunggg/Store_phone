import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { errCode, failCode, successCode } from 'src/response';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { LoginInterface, LoginPayloadInterface } from './interface/login';
import { SignUpInterface, SignUpReqInterface } from './interface/sign-up';
import { ForgotPasswordInterface } from './interface/forgot-password';
import { AuthDto } from './dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPassInterface } from './interface/reset-pass';
import { Tokens } from './type/token.type';
import { JwtPayload } from './type/jwtPayload.type';
import { refreshTokensInterface } from './interface/refresh-token';
import { ProfileInterface } from './interface/profile';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService,
        private authRepository: AuthRepository,
        private mailService: MailerService
    ) { }

    prisma = new PrismaClient();

    async profile(res: Response, userId: number): Promise<void> {
        try {
            const checkUser = await this.prisma.user.findUnique({
                where: {
                    id_user: userId
                }
            })

            if (!checkUser) {
                errCode(res, '', "Không tìm thấy user!");
                return
            }

            const user: ProfileInterface = {
                id_user: checkUser.id_user,
                name: checkUser.name,
                email: checkUser.email,
                birthday: checkUser.birthday,
                address: checkUser.address,
                phone: checkUser.phone

            }

            successCode(res, user)
        } catch (error) {
            failCode(res, error.message);
        }
    }

    async login(res: Response, user: LoginInterface) {
        try {
            const checkUser = await this.authRepository.checkEmailUser(user.email)

            if (!checkUser) {
                errCode(res, user, "Tài khoản không đúng!")
                return
            }

            const passwordMatches = await bcrypt.compare(user.password, checkUser.password);

            if (!passwordMatches) {
                errCode(res, user.password, "Mật khẩu không đúng!");
                return;
            }

            if (!checkUser.verifyEmail) {
                errCode(res, checkUser.verifyEmail, "Email chưa được xác thực!");
                return;
            }

            const tokens = await this.getTokens(checkUser)

            await this.updateRtHash(res, checkUser.id_user, tokens.refreshToken)

            let data: LoginPayloadInterface = checkUser

            data.accessToken = tokens.accessToken
            data.refreshToken = tokens.refreshToken

            successCode(res, data, "Đăng nhập thành công")
        } catch (error) {
            failCode(res, error.message)
        }

    }

    async loginAdmin(res: Response, user: LoginInterface) {

        try {
            const checkUser = await this.authRepository.checkEmailUser(user.email)

            if (!checkUser) {
                errCode(res, user, "Tài khoản không đúng!")
                return
            }

            if (!checkUser.role) {
                errCode(res, user, "Tài khoản không phải admin!")
                return
            }

            const passwordMatches = await bcrypt.compare(user.password, checkUser.password);

            if (!passwordMatches) {
                errCode(res, user.password, "Mật khẩu không đúng!");
                return;
            }

            if (!checkUser.verifyEmail) {
                errCode(res, checkUser.verifyEmail, "Email chưa được xác thực!");
                return;
            }

            const tokens = await this.getTokens(checkUser);

            await this.updateRtHash(res, checkUser.id_user, tokens.refreshToken)

            let data: LoginPayloadInterface = checkUser

            data.accessToken = tokens.accessToken
            data.accessToken = tokens.accessToken

            successCode(res, data, "Đăng nhập thành công")

        } catch (error) {
            failCode(res, error.message)

        }
    }

    async signUp(res: any, user: SignUpReqInterface) {
        try {
            const checkEmail = await this.authRepository.checkEmailUser(user.email)

            if (checkEmail) {
                errCode(res, user.email, "Email đã tồn tại")
                return
            }

            if (!user.role) {
                user.role = false
            }

            if (typeof user.birthday === "string") {
                user.birthday = new Date(user.birthday)
            }

            const hash = await this.hashData(user.password);
            user.password = hash

            const tokenEmail = this.createToken(user.email, "VERIFY_EMAIL", "3d")

            const newDataSignUp: SignUpInterface = {
                name: user.name,
                email: user.email,
                password: user.password,
                birthday: user.birthday,
                address: user.address,
                phone: user.phone,
                role: user.role,
                verifyEmail: false,
                verifyEmailToken: tokenEmail
            }

            const userSignUp = await this.authRepository.signUp(newDataSignUp)

            if (userSignUp && (!userSignUp.verifyEmail)) {
                await this.mailService.sendMail({
                    to: newDataSignUp.email,
                    subject: "Welcome",
                    template: './VerifyEmail',
                    context: {
                        token: userSignUp.verifyEmailToken
                    }
                })
            }

            const tokens = await this.getTokens(userSignUp)

            await this.updateRtHash(res, userSignUp.id_user, tokens.refreshToken)

            successCode(res, { user, tokens })
        } catch (error) {
            failCode(res, error.message)
        }
    }

    async refreshToken(res: Response, user: refreshTokensInterface) {
        try {
            const checkUser = await this.authRepository.checkUserById(user.id_user);

            if (!checkUser || !checkUser.hashedRt) throw new ForbiddenException('Access Denied');

            const rtMatches = await bcrypt.compare(user.refresh_token, checkUser.hashedRt);

            if (!rtMatches) throw new ForbiddenException('Access Denied');

            const decodedRefreshToken: any = this.jwtService.decode(user.refresh_token);

            const expirationTimeFrame = 7 * 24 * 60 * 60; // 

            if (decodedRefreshToken && decodedRefreshToken.iat && Date.now() / 1000 - decodedRefreshToken.iat > expirationTimeFrame) {
                throw new ForbiddenException('Refresh token has expired');
            }


            const tokens = await this.getTokens(checkUser);

            await this.updateRtHash(res, user.id_user, tokens.refreshToken);

            successCode(res, tokens)

        } catch (error) {
            failCode(res, error.message)

        }
    }

    async forgotPassword(res: any, user: ForgotPasswordInterface) {
        const checkUser = await this.authRepository.checkEmailUser(user.email)

        if (!checkUser) {
            errCode(res, user.email, "Tài khoản không đúng!")
            return
        }

        const tokenForgot = await this.createTokenForgotPass(user.email, checkUser, res)

        if (tokenForgot && tokenForgot.resetPasswordToken) {

            await this.mailService.sendMail({
                to: checkUser.email,
                subject: "Welcome",
                template: './ForgotPass',
                context: {
                    token: tokenForgot.resetPasswordToken
                }
            })
        } else {
            errCode(res, tokenForgot, "Không có token!")
            return
        }

        successCode(res, tokenForgot)

    }

    async createTokenForgotPass(email: string, checkUser: AuthDto, res: any) {

        if (
            checkUser.resetPasswordExpire &&
            (new Date().getTime() - checkUser.resetPasswordExpire.getTime()) / 60000 < 15
        ) {
            errCode(res, email, "Email đã được gửi trước đó!")
            return
        } else {

            const newTokenPass = this.createToken(email, "FORGOT_PASS", "15m")

            const updateResetPass = await this.prisma.user.update({
                where: {
                    id_user: checkUser.id_user
                },
                data: {
                    resetPasswordToken: newTokenPass,
                    resetPasswordExpire: new Date()
                }
            })

            if (updateResetPass) {
                return {
                    resetPasswordToken: updateResetPass.resetPasswordToken,
                    resetPasswordExpire: updateResetPass.resetPasswordExpire
                }
            } else {
                throw new HttpException(
                    "UPDATE_RESET_PASSWORD_EXPIRE_FAIL",
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            }
        }
    }

    async resetPass(res: any, token: string, body: ResetPassInterface) {

        const checkUser = await this.authRepository.checkUserByTokenPass(token);

        if (!checkUser) {
            errCode(res, checkUser, "Không tìm thấy người dùng!")
            return
        }

        const exp = (new Date().getTime() - checkUser.resetPasswordExpire.getTime()) / 60000

        if (exp > 15) {
            errCode(res, checkUser, "Reset Password quá thời hạn!")
            return
        }

        const hash = await this.hashData(body.password);

        await this.authRepository.resetPass(hash, checkUser.id_user)

        successCode(res, body.password)
    }

    async verifyEmail(res: any, token: string) {
        try {
            const checkUser = await this.prisma.user.findFirst({
                where: {
                    verifyEmailToken: token
                }
            })

            if (!checkUser) {
                errCode(res, token, "Không tìm thấy người dùng!");
                return
            }

            await this.prisma.user.update({
                where: {
                    id_user: checkUser.id_user
                },
                data: {
                    verifyEmail: true,
                    verifyEmailToken: null
                }
            })

            successCode(res, '')

        } catch (error) {
            failCode(res, error.message)
        }
    }

    hashData(data: string) {
        return bcrypt.hash(data, 10);
    }

    createToken(data: any, secret: string, expiresIn: string) {
        return this.jwtService.sign({ data: data }, { secret: this.config.get(secret), expiresIn: expiresIn })
    }

    async getTokens(payload: AuthDto): Promise<Tokens> {

        const data: JwtPayload = {
            id_user: payload.id_user,
            name: payload.name,
            email: payload.email,
        }

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(data, {
                secret: this.config.get<string>('AT_SECRET'),
                expiresIn: '3d',
            }),
            this.jwtService.signAsync(data, {
                secret: this.config.get<string>('RT_SECRET'),
                expiresIn: '7d',
            }),
        ]);


        return {
            accessToken: at,
            refreshToken: rt
        };
    }

    async updateRtHash(res: any, userId: number, rt: string) {
        try {
            const hash = await this.hashData(rt)
            await this.prisma.user.update({
                where: {
                    id_user: userId
                },
                data: {
                    hashedRt: hash
                }
            })
        } catch (error) {
            failCode(res, error.message)

        }
    }


}
