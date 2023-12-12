import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import * as path from 'path';
import { extractPublicId } from 'cloudinary-build-url'
@Injectable()
export class CloudinaryService {
    async uploadImage(
        file: Express.Multer.File,
    ): Promise<string> {

        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream({
                folder: 'phone'
            }, (error, result) => {
                if (error) return reject(error);

                if (result && result.secure_url) {
                    // Lấy URL an toàn (secure_url) và trả về nó
                    resolve(result.secure_url);
                } else {
                    reject(new Error('Không thể lấy URL hình ảnh sau khi tải lên.'));
                }
            });

            toStream(file.buffer).pipe(upload);
        });
    }

    getImageNameFromUrl(url: string): string | null {
        try {
            const { base } = path.parse(url);
            return base;
        } catch (error) {
            console.error('Error extracting image name:', error);
            return null;
        }
    }



    async deleteImage(urlImg: string): Promise<void> {
        const publicId = extractPublicId(urlImg)
        return new Promise((resolve, reject) => {
            v2.api.delete_resources(
                [publicId],
                { type: 'upload', resource_type: 'image' },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }


}