import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { SignUpInterface, SignUpReqInterface } from "./interface/sign-up";

@Injectable()
export class AuthRepository {
    prisma = new PrismaClient();

    async signUp(userData: SignUpInterface) {
        return this.prisma.user.create({ data: userData });
    }

    async checkEmailUser(email: string) {
        return this.prisma.user.findFirst({ where: { email: email } })
    };

    async checkUserByToken(token: string) {
        return await this.prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
            }
        })
    }

    async resetPass(password: string, id: number) {
        return await this.prisma.user.update({
            where: {
                id_user: id
            },
            data: {
                password: password,
                resetPasswordToken: null,
                resetPasswordExpire: null
            }
        })
    }

}