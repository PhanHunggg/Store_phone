import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { SignUpInterface, UserDTO, UserPayloadDTO, loginInterFace } from './dto';
import { JwtService } from '@nestjs/jwt';
import { errCode, successCode } from 'src/response';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService,
        private authRepository: AuthRepository
    ) { }

    prisma = new PrismaClient();

    async login(res, user: loginInterFace) {
        const checkUser = await this.authRepository.findByEmail(user.email)

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

        const checkEmail = await this.authRepository.findByEmail(user.email)

        if (checkEmail) {
            errCode(res, user.email, "Email đã tồn tại")
            return
        }
        if (!user.role) user.role = false

        if (typeof user.birthday === "string") {
            user.birthday = new Date(user.birthday)
        }

        await this.authRepository.createUser(user)

        successCode(res, user)
    }


}
