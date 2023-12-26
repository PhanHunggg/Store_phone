import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { errCode, successCode } from 'src/response';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { LoginInterface, LoginPayloadInterface } from './interface/login';
import { SignUpInterface } from './interface/sign-up';
import { UpdatePassInterface } from './interface/update-pass';
import { ForgotPasswordInterface } from './interface/forgot-password';
import { AuthDto } from './dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPassInterface } from './interface/reset-pass';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService,
        private authRepository: AuthRepository,
        private mailService: MailerService
    ) { }

    prisma = new PrismaClient();

    async login(res, user: LoginInterface) {
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

        const dataAccess = {
            id: checkUser.id_user,
            name: checkUser.name,
            email: checkUser.email,
            password: checkUser.password
        }


        const token = this.jwtService.sign({ data: dataAccess }, { secret: this.config.get("SECRET_KEY"), expiresIn: "7d" })

        let data: LoginPayloadInterface = checkUser

        data.accessToken = token

        successCode(res, data, "Đăng nhập thành công")

    }

    async signUp(res: any, user: SignUpInterface) {
        const checkEmail = await this.authRepository.checkEmailUser(user.email)

        if (checkEmail) {
            errCode(res, user.email, "Email đã tồn tại")
            return
        }

        if (!user.role) user.role = false

        if (typeof user.birthday === "string") {
            user.birthday = new Date(user.birthday)
        }

        const hash = await this.hashData(user.password);
        user.password = hash
        const userSignUp = await this.authRepository.signUp(user)

        const dataAccess = {
            id: userSignUp.id_user,
            name: userSignUp.name,
            email: userSignUp.email,
            password: userSignUp.password
        }

        const token = this.jwtService.sign({ data: dataAccess }, { secret: this.config.get("SECRET_KEY"), expiresIn: "7d" })

        const newData = {
            ...user,
            accessToken: token
        }
        successCode(res, newData)
    }


    async forgotPassword(res: any, user: ForgotPasswordInterface) {
        const checkUser = await this.authRepository.checkEmailUser(user.email)

        if (!checkUser) {
            errCode(res, user.email, "Tài khoản không đúng!")
            return
        }

        const tokenForgot = await this.createTokenForgotPass(user.email, checkUser)

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

    hashData(data: string) {
        return bcrypt.hash(data, 10);
    }

    async createTokenForgotPass(email: string, checkUser: AuthDto) {

        if (
            checkUser.resetPasswordExpire &&
            (new Date().getTime() - checkUser.resetPasswordExpire.getTime()) / 60000 < 15
        ) {
            throw new HttpException(
                "RESET_PASSWORD_EMAIL_SENDED_RESENTLY",
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        } else {

            const newTokenPass = this.jwtService.sign({ data: email }, { secret: this.config.get("FORGOT_PASS"), expiresIn: "15m" })

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

        const checkUser = await this.authRepository.checkUserByToken(token);

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

}
