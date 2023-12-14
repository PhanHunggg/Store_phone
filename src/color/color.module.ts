import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { ColorRepository } from './color.repository';

@Module({
  controllers: [ColorController],
  providers: [ColorService, ColorRepository]
})
export class ColorModule { }
