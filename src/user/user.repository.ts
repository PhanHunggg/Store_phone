import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserDTO } from "./dto";

@Injectable()
export class UserRepository {
    prisma = new PrismaClient();

    async createUser(data: UserDTO) {
        return this.prisma.user.create({
            data
        })
    }

    async findMailUser(email: any) {
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

    async findProduct(id: number) {
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

    async updateUser(id: number, data: UserDTO) {
        return await this.prisma.user.update({
            data,
            where: {
                id_user: id
            }
        }
        )
    }

}