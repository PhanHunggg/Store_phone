import { ColorRepository } from './color.repository';
import { ColorInterface } from './interface';
export declare class ColorService {
    private colorRepository;
    constructor(colorRepository: ColorRepository);
    create(createColorDto: ColorInterface, res: any): Promise<void>;
    getColorList(res: any): Promise<void>;
    remove(id: number, res: any): Promise<void>;
    findColor(res: any, id: number): Promise<void>;
}
