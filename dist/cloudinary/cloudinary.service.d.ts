/// <reference types="multer" />
export declare class CloudinaryService {
    uploadImage(file: Express.Multer.File): Promise<string>;
    getImageNameFromUrl(url: string): string | null;
    deleteImage(urlImg: string): Promise<void>;
}
