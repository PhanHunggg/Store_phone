import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ColorRepository } from './color.repository';
import { Color } from '@prisma/client';
import { ConflictException, InternalServerErrorException } from 'src/exception/exception';
import { ColorDTO } from 'src/color/dto/create-color.dto';

@Injectable()
export class ColorService {

  constructor(private colorRepository: ColorRepository) { }

  async create(createColorDto: ColorDTO): Promise<Color> {
    try {
      const checkColor: Color = await this.colorRepository.findColorByHex(createColorDto.hex)
      if (checkColor) {
        throw new ConflictException('Color already exists')
      }
      const color: Color = await this.colorRepository.create(createColorDto)
      return color
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async getColorList(): Promise<Color[]> {
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

  async remove(id: number) {
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

  async findColor( id: number) {
    try {
      const color: Color = await this.colorRepository.findColor(id)
      if (!color) {
        throw new NotFoundException('Color not found')
      }
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
