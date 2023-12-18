import { Injectable } from '@nestjs/common';
import { ColorRepository } from './color.repository';
import { ColorInterface } from './interface';
import { errCode, failCode, successCode } from 'src/response';

@Injectable()
export class ColorService {

  constructor(private colorRepository: ColorRepository) { }

  async create(createColorDto: ColorInterface, res) {
    try {
      await this.colorRepository.create(createColorDto)
      successCode(res, createColorDto)
    } catch (error) {
      failCode(res, error.message)
    }
  }

  async getColorList(res: any) {
    try {
      const checkColor = await this.colorRepository.getColorList()

      if (!!!checkColor.length) {
        errCode(res, checkColor, "Không tìm thấy danh sách màu!")
        return
      }

      successCode(res, checkColor)
    } catch (error) {
      failCode(res, error.message)
    }
  }

  async remove(id: number, res: any) {
    try {
    const checkColor = await this.colorRepository.findColor(id)

    if (!checkColor) {
      errCode(res, checkColor, "Không tìm thấy màu!")
      return
    }

    await this.colorRepository.deleteColor(id)

    successCode(res, '')
    } catch (error) {
      failCode(res, error.message)
    }
  }

  async findColor(res: any, id: number) {
    try {
      const color = await this.colorRepository.findColor(id)

      successCode(res, color)
    } catch (error) {
      failCode(res, error.message)
    }
  }


}
