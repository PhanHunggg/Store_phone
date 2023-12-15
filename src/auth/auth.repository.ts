import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { SignUpInterface, UpdatePassInterface, loginInterFace } from "./dto";

@Injectable()
export class AuthRepository {
    prisma = new PrismaClient();

    async createUser(userData: SignUpInterface) {
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