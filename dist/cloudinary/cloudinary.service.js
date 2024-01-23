"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const toStream = require("buffer-to-stream");
const path = require("path");
const cloudinary_build_url_1 = require("cloudinary-build-url");
let CloudinaryService = class CloudinaryService {
    async uploadImage(file) {
        return new Promise((resolve, reject) => {
            const upload = cloudinary_1.v2.uploader.upload_stream({
                folder: 'phone'
            }, (error, result) => {
                if (error)
                    return reject(error);
                if (result && result.secure_url) {
                    resolve(result.secure_url);
                }
                else {
                    reject(new Error('Không thể lấy URL hình ảnh sau khi tải lên.'));
                }
            });
            toStream(file.buffer).pipe(upload);
        });
    }
    getImageNameFromUrl(url) {
        try {
            const { base } = path.parse(url);
            return base;
        }
        catch (error) {
            console.error('Error extracting image name:', error);
            return null;
        }
    }
    async deleteImage(urlImg) {
        const publicId = (0, cloudinary_build_url_1.extractPublicId)(urlImg);
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.api.delete_resources([publicId], { type: 'upload', resource_type: 'image' }, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
};
CloudinaryService = __decorate([
    (0, common_1.Injectable)()
], CloudinaryService);
exports.CloudinaryService = CloudinaryService;
//# sourceMappingURL=cloudinary.service.js.map