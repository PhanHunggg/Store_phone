import { ColorService } from './color.service';
import { ColorInterface } from './interface';
import { Response } from 'express';
export declare class ColorController {
    private readonly colorService;
    constructor(colorService: ColorService);
    create(createColorDto: ColorInterface, res: Response): Promise<Response<any, Record<string, any>>>;
    getColorList(res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findColor(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
