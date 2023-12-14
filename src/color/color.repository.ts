import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { ColorInterface } from "./interface";

@Injectable()
export class ColorRepository {
    prisma = new PrismaClient()

    async create(data: ColorInterface) {
        return await this.prisma.color.create({
            data
        })
    }

    async getColorList() {
        return await this.prisma.color.findMany()
    }

    async findColor(id: number) {
        return await this.prisma.color.findUnique({ where: { id_color: id } })
    }

    async deleteColor(id: number) {
        return await this.prisma.color.delete({ where: { id_color: id } })
    }
}