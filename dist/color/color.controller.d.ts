import { ColorService } from './color.service';
import { ColorInterface } from './interface';
export declare class ColorController {
    private readonly colorService;
    constructor(colorService: ColorService);
    create(createColorDto: ColorInterface, res: any): Promise<void>;
    getColorList(res: any): Promise<void>;
    remove(id: string, res: any): Promise<void>;
    findColor(id: string, res: any): Promise<void>;
}
