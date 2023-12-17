import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserInterface } from "./interface/user";

@Injectable()
export class UserRepository {
    prisma = new PrismaClient();


    async findUserByEmail(email: any) {
        return await this.prisma.user.findFirst(
            {
                where: {
                    email
                }
            }
        )

    }

    async getUserList() {
        return await this.prisma.user.findMany()

    }

    async findUser(id: number) {
        return await this.prisma.user.findUnique({
            where: {
                id_user: id
            }
        })
    }

    async delete(id: number) {
        return await this.prisma.user.delete({
            where: {
                id_user: id
            }
        })
    }

    async updateUser(id: number, data: UserInterface) {
        return await this.prisma.user.update({
            data,
            where: {
                id_user: id
            }
        }
        )
    }

}