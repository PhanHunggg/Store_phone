import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { SignUpInterface, UpdatePassInterface, UserDTO, UserPayloadDTO, loginInterFace } from './dto';
import { JwtService } from '@nestjs/jwt';
import { errCode, successCode } from 'src/response';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService,
        private authRepository: AuthRepository
    ) { }

    prisma = new PrismaClient();

    async login(res, user: loginInterFace) {
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


        const token = this.jwtService.sign({ data: checkUser }, { secret: this.config.get("SECRET_KEY"), expiresIn: "7d" })



        let data: UserPayloadDTO = checkUser

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

        const token = this.jwtService.sign({ data: user }, { secret: this.config.get("SECRET_KEY"), expiresIn: "7d" })

        const hash = await this.hashData(user.password);

        user.password = hash

        await this.authRepository.createUser(user)

        const newData = {
            ...user,
            accessToken: token
        }

        successCode(res, newData)
    }

    async updatePassword(res: any, user: loginInterFace) {
        const checkUser = await this.authRepository.checkEmailUser(user.email)

        if (!checkUser) {
            errCode(res, user, "Tài khoản không đúng!")
            return
        }

        const hash = await this.hashData(user.password);

        const newData: UpdatePassInterface = {
            id_user: checkUser.id_user,
            password: hash
        }

        await this.authRepository.updatePassword(newData)

        successCode(res, newData)


    }


    hashData(data: string) {
        return bcrypt.hash(data, 10);
    }

}
