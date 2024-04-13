import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ColorRepository } from './color.repository';
import { ColorInterface } from './interface';
import { errCode, failCode, successCode } from 'src/response';
import { Color } from '@prisma/client';
import { InternalServerErrorException } from 'src/exception/exception';

@Injectable()
export class ColorService {

  constructor(private colorRepository: ColorRepository) { }

  async create(createColorDto: ColorInterface, res) {
    try {
      await this.colorRepository.create(createColorDto)
      return createColorDto
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async getColorList(res: any):Promise<Color[]> {
    try {
      const checkColor: Color[] = await this.colorRepository.getColorList()
      return checkColor

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async remove(id: number, res: any) {
    try {
    const checkColor: Color = await this.colorRepository.findColor(id)

    if (!checkColor) {
      throw new NotFoundException('Color not found')
    }

    await this.colorRepository.deleteColor(id)
    return checkColor
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async findColor(res: any, id: number) {
    try {
      const color: Color = await this.colorRepository.findColor(id)
      return color

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }


}
