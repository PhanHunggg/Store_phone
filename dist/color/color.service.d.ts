import { ColorRepository } from './color.repository';
import { ColorInterface } from './interface';
import { Color } from '@prisma/client';
export declare class ColorService {
    private colorRepository;
    constructor(colorRepository: ColorRepository);
    create(createColorDto: ColorInterface): Promise<Color>;
    getColorList(): Promise<Color[]>;
    remove(id: number): Promise<{
        id_color: number;
        name: string;
        hex: string;
    }>;
    findColor(id: number): Promise<{
        id_color: number;
        name: string;
        hex: string;
    }>;
}
