import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { SignUpInterface, UserDTO, UserPayloadDTO, loginInterFace } from './dto';
import { JwtService } from '@nestjs/jwt';
import { errCode, successCode } from 'src/response';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private config: ConfigService,
    ) { }

    prisma = new PrismaClient();

    async login(res, user: loginInterFace) {
        const checkUser = await this.prisma.user.findFirst({
            where: {
                email: user.email
            }
        })

        if (!checkUser) {
            errCode(res, user, "Tài khoản không đúng!")
            return
        }

        if (checkUser.password !== user.password) {
            errCode(res, user, "Mật khẩu không đúng!");
            return
        }

        const token = this.jwtService.sign({ data: checkUser }, { secret: this.config.get("SECRET_KEY"), expiresIn: "7d" })



        let data: UserPayloadDTO = checkUser

        data.accessToken = token

        successCode(res, data, "Đăng nhập thành công")

    }

    async signUp(res: any, user: SignUpInterface) {

        const checkEmail = await this.prisma.user.findFirst({
            where: {
                email: user.email
            }
        })

        if (checkEmail) {
            errCode(res, user, "Email đã tồn tại")
            return
        }
        if (!user.role) user.role = true
      
        if (typeof user.birthday === "string") {
            user.birthday = new Date(user.birthday)
        }

        await this.prisma.user.create({
            data: user
        })

        successCode(res, user)
    }


}
