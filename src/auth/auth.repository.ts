import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UpdatePassInterface } from "./interface/update-pass";
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

    async updatePassword(user: UpdatePassInterface) {
        return this.prisma.user.update({
            where: {
                id_user: user.id_user
            },
            data: {
                password: user.password
            }
        })
    }

}