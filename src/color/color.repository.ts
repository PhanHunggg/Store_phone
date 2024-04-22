import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { ColorDTO } from "src/color/dto/create-color.dto";

@Injectable()
export class ColorRepository {
    prisma = new PrismaClient()

    async create(data: ColorDTO) {
        return await this.prisma.color.create({
            data
        })
    }
    
    async findColorByHex(hex: string){
        return await this.prisma.color.findFirst({
            where: { hex }
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