import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { errCode, successCode } from 'src/response';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { LoginInterface, LoginPayloadInterface } from './interface/login';
import { SignUpInterface } from './interface/sign-up';
import { UpdatePassInterface } from './interface/update-pass';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService,
        private authRepository: AuthRepository
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

    async updatePassword(res: any, user: LoginInterface) {
        
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
