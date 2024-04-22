import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { LoginResInterface } from './interface/login';
import { SignUpInterface, SignUpInterfaceRes } from './interface/sign-up';
import { TokenForgotInterface } from './interface/forgot-password';
import { MailerService } from '@nestjs-modules/mailer';
import { Tokens } from './type/token.type';
import { JwtPayload } from './type/jwtPayload.type';
import { ProfileOrderInterface } from './interface/profile';
import { Response } from 'express';
import { BadRequestException, ConflictException, CustomException, ForbiddenException, InternalServerErrorException, NotFoundException, PreconditionFailedException, TooManyRequestsException, UnauthorizedException } from 'src/exception/exception';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { SignUpDTO } from 'src/auth/dto/signup.dto';
import { ForgotPasswordDTO } from 'src/auth/dto/forgot-pass.dto';
import { ResetPassTokenDTO } from 'src/auth/dto/reset-pass-token.dto';
import { ResetPassDTO } from 'src/auth/dto/reset-pass.dto';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService,
        private authRepository: AuthRepository,
        private mailService: MailerService,
    ) { }

    prisma = new PrismaClient();

    async profile(userId: number): Promise<ProfileOrderInterface> {
        try {
            const checkUser = await this.authRepository.checkUserOrderById(userId);

            if (!checkUser) {
                throw new NotFoundException("User không tồn tại!")
            }

            const user: ProfileOrderInterface = {
                id_user: checkUser.id_user,
                name: checkUser.name,
                email: checkUser.email,
                birthday: checkUser.birthday,
                address: checkUser.address,
                phone: checkUser.phone,
                productItem: checkUser.order
            }

            return user
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    async login(user: LoginDTO): Promise<LoginResInterface> {
        try {
            const checkUser: User = await this.authRepository.checkEmailUser(user.email)

            if (!checkUser)
                throw new NotFoundException('Tài khoản không đúng!');

            if (!checkUser.verifyEmail) throw new PreconditionFailedException('Email chưa được xác thực!');

            const passwordMatches = await bcrypt.compare(user.password, checkUser.password);

            if (!passwordMatches)
                throw new UnauthorizedException('Mật khẩu không đúng!');


            const tokens = await this.getTokens(checkUser)

            await this.updateRtHash(checkUser.id_user, tokens.refreshToken)

            return this.formatResponse(checkUser, tokens);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }

    }

    async loginAdmin(user: LoginDTO): Promise<LoginResInterface> {

        try {
            const checkUser = await this.authRepository.checkEmailUser(user.email)

            if (!checkUser) throw new NotFoundException('Tài khoản không đúng!');

            if (!checkUser.verifyEmail) throw new PreconditionFailedException('Email chưa được xác thực!');

            if (!checkUser.role) throw new ForbiddenException("Tài khoản không được phép truy cập!")

            const passwordMatches = await bcrypt.compare(user.password, checkUser.password);

            if (!passwordMatches)
                throw new UnauthorizedException('Mật khẩu không đúng!');

            const tokens = await this.getTokens(checkUser);

            await this.updateRtHash(checkUser.id_user, tokens.refreshToken)

            let data: LoginResInterface = {
                id_user: checkUser.id_user,
                name: checkUser.name,
                email: checkUser.email,
                address: checkUser.address,
                birthday: checkUser.birthday,
                phone: checkUser.phone,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                role: checkUser.role
            }

            return data
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new CustomException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async signUp(user: SignUpDTO): Promise<SignUpInterfaceRes> {
        try {
            const checkEmail = await this.authRepository.checkEmailUser(user.email)

            if (checkEmail) {
                throw new ConflictException('Tài khoản đã tồn tại!');
            }

            if (!user.role) {
                user.role = false
            }

            if (typeof user.birthday === "string") {
                user.birthday = new Date(user.birthday)
            }

            const hash = await this.hashData(user.password);

            const tokenEmail = this.createToken(user.email, "VERIFY_EMAIL", "3d")

            const newDataSignUp: SignUpInterface = {
                name: user.name,
                email: user.email,
                password: hash,
                birthday: user.birthday,
                address: user.address,
                phone: user.phone,
                role: user.role,
                verifyEmail: false,
                verifyEmailToken: tokenEmail
            }

            const userSignUp: User = await this.authRepository.signUp(newDataSignUp)

            await this.sendVerificationEmail(userSignUp);

            const tokens = await this.getTokens(userSignUp)

            await this.updateRtHash(userSignUp.id_user, tokens.refreshToken)

            return this.formatResponse(userSignUp, tokens);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new CustomException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async refreshToken(userId:number, refreshToken:string): Promise<Tokens> {
        try {
            const checkUser = await this.authRepository.checkUserById(userId);

            if (!checkUser || !checkUser.hashedRt) throw new ForbiddenException('Access Denied');

            const rtMatches = await bcrypt.compare(refreshToken, checkUser.hashedRt);

            if (!rtMatches) throw new ForbiddenException('Access Denied');

            const decodedRefreshToken: any = this.jwtService.decode(refreshToken);

            const expirationTimeFrame = 7 * 24 * 60 * 60; // 

            if (decodedRefreshToken && decodedRefreshToken.iat && Date.now() / 1000 - decodedRefreshToken.iat > expirationTimeFrame) {
                throw new ForbiddenException('Refresh token has expired');
            }

            const tokens: Tokens = await this.getTokens(checkUser);

            await this.updateRtHash(checkUser.id_user, tokens.refreshToken);

            return tokens

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new CustomException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async forgotPassword(user: ForgotPasswordDTO): Promise<TokenForgotInterface> {
        try {
            const checkUser = await this.authRepository.checkEmailUser(user.email)

            if (!checkUser) throw new NotFoundException('Tài khoản không đúng!');

            const tokenForgot: TokenForgotInterface = await this.createTokenForgotPass(user.email, checkUser)

            await this.sendVerificationEmail(checkUser, tokenForgot)

            return tokenForgot
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new CustomException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    }

    async resetPassToken(token: string, body: ResetPassTokenDTO): Promise<string> {
        try {

            const checkUser = await this.authRepository.checkUserByTokenPass(token);

            if (!checkUser) throw new NotFoundException('User not found')

            const exp = (new Date().getTime() - checkUser.resetPasswordExpire.getTime()) / 60000

            if (exp > 15) {
                throw new PreconditionFailedException('Reset Password quá thời hạn!');
            }

            const hash = await this.hashData(body.password);

            await this.authRepository.resetPass(hash, checkUser.id_user)

            return body.password
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }
    async resetPass(userId: number, body: ResetPassDTO): Promise<string> {
        try {
            const checkUser = await this.authRepository.checkUserById(userId);

            if (!checkUser) throw new NotFoundException('User not found')

            const passwordMatches = await bcrypt.compare(body.old_password, checkUser.password);

            if (!passwordMatches)
                throw new UnauthorizedException('Mật khẩu cũ không đúng!');

            if (body.old_password === body.password) throw new BadRequestException("Mật khẩu mới không được trùng mật khẩu cũ!")

            const hash = await this.hashData(body.password);

            await this.authRepository.resetPass(hash, checkUser.id_user)

            return body.password
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    async verifyEmail(token: string): Promise<string> {
        try {
            const checkUser = await this.prisma.user.findFirst({
                where: {
                    verifyEmailToken: token
                }
            })

            if (!checkUser) throw new NotFoundException('Không tìm thấy người dùng!');

            await this.prisma.user.update({
                where: {
                    id_user: checkUser.id_user
                },
                data: {
                    verifyEmail: true,
                    verifyEmailToken: null
                }
            })
            return "Verify thành công"


        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    async logout(userId: number) {
        const checkUser: User = await this.authRepository.checkUserById(userId)

        if (!checkUser) throw new NotFoundException("Người dùng không tồn tại!!")

        await this.authRepository.logout(checkUser.id_user)

        return "Logout success!"
    }

    private async createTokenForgotPass(email: string, checkUser: User) {
        try {

            if (
                checkUser.resetPasswordExpire &&
                (new Date().getTime() - checkUser.resetPasswordExpire.getTime()) / 60000 < 15
            ) {
                throw new TooManyRequestsException('Email đã được gửi trước đó!');
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
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    private async sendVerificationEmail(user: User, tokenForgot?: TokenForgotInterface): Promise<void> {
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
        } else {
            if (tokenForgot && tokenForgot.resetPasswordToken) {
                await this.mailService.sendMail({
                    to: user.email,
                    subject: "Welcome",
                    template: './ForgotPass',
                    context: {
                        token: tokenForgot.resetPasswordToken
                    }
                })
            } else {
                throw new PreconditionFailedException('Không có token!');
            }
        }
    }

    private formatResponse(user: User, tokens: Tokens): SignUpInterfaceRes {
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

    private hashData(data: string) {
        return bcrypt.hash(data, 10);
    }

    private createToken(data: any, secret: string, expiresIn: string) {
        return this.jwtService.sign({ data: data }, { secret: this.config.get(secret), expiresIn: expiresIn })
    }

    private async getTokens(payload: User): Promise<Tokens> {

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

    private async updateRtHash(userId: number, rt: string) {
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
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }


}
