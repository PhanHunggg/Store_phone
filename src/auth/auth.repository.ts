import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { SignUpInterface } from "./interface/sign-up";

@Injectable()
export class AuthRepository {
    prisma = new PrismaClient();

    async signUp(userData: SignUpInterface) {
        return this.prisma.user.create({ data: userData });
    }

    async checkEmailUser(email: string) {
        return this.prisma.user.findFirst({ where: { email: email } })
    };

    async checkUserById(id: number) {
        return this.prisma.user.findUnique({ where: { id_user: id } })
    };

    async logout(id: number) {
        return this.prisma.user.update({
            where: { id_user: id, hashedRt: { not: null } },
            data: {
                hashedRt: null
            }
        })
    }

    async checkUserOrderById(id_user: number) {
        return await this.prisma.user.findUnique({
            where: {
                id_user
            },
            include: {
                order: true,
            }
        })
    }

    async checkUserByTokenPass(token: string) {
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