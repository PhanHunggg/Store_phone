import { Injectable } from "@nestjs/common";
import { Brand, PrismaClient } from "@prisma/client";
import { BrandInterface } from "./interface";

@Injectable()
export class BrandRepository {
  prisma = new PrismaClient();

  async createBrand(data: BrandInterface) {
    return this.prisma.brand.create({ data });
  }

  async findBrandById(id: number) {
    return this.prisma.brand.findUnique({ where: { id_brand: id } });
  }

  async findBrandByName(name: string): Promise<Brand | null> {
    return this.prisma.brand.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
    });
  }

  async deleteBrand(id: number) {
    return this.prisma.brand.delete({ where: { id_brand: id } });
  }

  async getBrandList() {
    return this.prisma.brand.findMany();
  }

  async updateBrand(data: BrandInterface, id: number) {
    return this.prisma.brand.update({
      where: {
        id_brand: id,
      },
      data: data,
    });
  }
}
