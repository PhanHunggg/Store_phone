"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const response_1 = require("../response");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const product_repository_1 = require("./product.repository");
const brand_repository_1 = require("../brand/brand.repository");
const category_repository_1 = require("../category/category.repository");
const category_brand_repository_1 = require("../category-brand/category-brand.repository");
let ProductService = class ProductService {
    constructor(cloudinary, productRepository, brandRepository, categoryRepository, categoryBrandRepository) {
        this.cloudinary = cloudinary;
        this.productRepository = productRepository;
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
        this.categoryBrandRepository = categoryBrandRepository;
        this.prisma = new client_1.PrismaClient();
    }
    async createProduct(createProduct, res) {
        try {
            const categoryBrand = {
                id_brand: createProduct.brand,
                id_category: createProduct.categories
            };
            const checkCategoryBrand = await this.categoryBrandRepository.findByBrandCategory(categoryBrand);
            if (!checkCategoryBrand) {
                (0, response_1.errCode)(res, createProduct, "Không tìm thấy loại và hãng sản phẩm.");
                return;
            }
            let thumbnail;
            let arrImg;
            if (Array.isArray(createProduct.img)) {
                thumbnail = createProduct.img[0].url;
                arrImg = createProduct.img.splice(1);
            }
            const data = {
                categoryBrandMapping: {
                    connect: {
                        id_categoryBrand: checkCategoryBrand.id_categoryBrand
                    }
                },
                name: createProduct.name,
                thumbnail: thumbnail,
                chip: createProduct.chip,
                price: Number(createProduct.price),
                original_price: Number(createProduct.original_price),
                battery: createProduct.battery,
                quantity: Number(createProduct.quantity),
                new_release: createProduct.new_release,
                screen: createProduct.screen,
                front_camera: createProduct.front_camera,
                rear_camera: createProduct.rear_camera,
                img: arrImg,
                storage: createProduct.storage,
                color: createProduct.color,
            };
            const newData = await this.productRepository.createProduct(data);
            (0, response_1.successCode)(res, newData);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async getProductList(res) {
        try {
            const checkProduct = await this.productRepository.getProductList();
            if (!!!checkProduct.length) {
                (0, response_1.errCode)(res, checkProduct, "Không tìm thấy product nào!");
                return;
            }
            (0, response_1.successCode)(res, checkProduct);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async findProduct(id, res) {
        const checkProduct = await this.productRepository.findProduct(id);
        if (!checkProduct) {
            (0, response_1.errCode)(res, checkProduct, "Không tìm thấy sản phẩm");
            return;
        }
        (0, response_1.successCode)(res, checkProduct);
    }
    async updateThumbnail(id, img, res) {
        try {
            const checkProduct = await this.productRepository.findProduct(id);
            if (!checkProduct) {
                (0, response_1.errCode)(res, checkProduct, "Không tìm thấy product!");
                return;
            }
            const imgUrl = await this.cloudinary.uploadImage(img);
            await this.productRepository.updateThumbnail(id, imgUrl);
            (0, response_1.successCode)(res, imgUrl);
        }
        catch (error) {
        }
    }
    async deleteProduct(id_product, res) {
        const checkProduct = await this.productRepository.findProduct(id_product);
        if (!checkProduct) {
            (0, response_1.errCode)(res, "", "Không tìm thấy sản phẩm");
            return;
        }
        await this.productRepository.deleteProduct(id_product);
        (0, response_1.successCode)(res, '');
    }
    async updateProduct(res, id, product) {
        const checkProduct = await this.productRepository.findProduct(id);
        if (!checkProduct) {
            (0, response_1.errCode)(res, checkProduct, "Không tìm thấy sản phẩm");
            return;
        }
        const categoryBrand = {
            id_brand: product.brand,
            id_category: product.categories
        };
        const checkCategoryBrand = await this.categoryBrandRepository.findByBrandCategory(categoryBrand);
        if (!checkCategoryBrand) {
            (0, response_1.errCode)(res, product, "Không tìm thấy loại và hãng sản phẩm.");
            return;
        }
        const newData = {
            id_categoryBrand: checkCategoryBrand.id_categoryBrand,
            name: product.name,
            chip: product.chip,
            price: product.price,
            original_price: product.original_price,
            battery: product.battery,
            quantity: product.quantity,
            new_release: product.new_release,
            screen: product.screen,
            front_camera: product.front_camera,
            rear_camera: product.rear_camera,
            storage: product.storage,
            color: product.color
        };
        await this.productRepository.updateProduct(id, newData);
        (0, response_1.successCode)(res, newData);
    }
    async getEquivalentProduct(res, id) {
        try {
            const productList = await this.productRepository.getEquivalentProduct(id);
            if (!!!productList.length) {
                (0, response_1.errCode)(res, productList, "Không tìm thấy Product!");
                return;
            }
            (0, response_1.successCode)(res, productList);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async findByCategoryBrand(res, brandCategory) {
        try {
            const checkCategoryBrand = await this.categoryBrandRepository.findByBrandCategory(brandCategory);
            if (!checkCategoryBrand) {
                (0, response_1.errCode)(res, checkCategoryBrand, "Không tìm thấy hãng và loại sản phẩm!");
                return;
            }
            const productList = await this.productRepository.getEquivalentProduct(checkCategoryBrand.id_categoryBrand);
            if (!!!productList.length) {
                (0, response_1.errCode)(res, productList, "Không tìm thấy Product!");
                return;
            }
            (0, response_1.successCode)(res, productList);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async findProductByBrand(res, id_brand) {
        const checkBrand = await this.brandRepository.findBrandById(id_brand);
        if (!checkBrand) {
            (0, response_1.errCode)(res, checkBrand, "Không tìm thấy hãng!");
            return;
        }
        const checkCategory = await this.categoryRepository.findPhoneCategory();
        if (!checkCategory) {
            (0, response_1.errCode)(res, checkCategory, "Không tìm thấy loại sản phẩm!");
            return;
        }
        const brandCategory = {
            id_brand: checkBrand.id_brand,
            id_category: checkCategory.id_category
        };
        const checkCategoryBrand = await this.categoryBrandRepository.findByBrandCategory(brandCategory);
        if (!checkCategoryBrand) {
            (0, response_1.errCode)(res, checkCategoryBrand, "Không tìm thấy loại và hãng sản phẩm!");
            return;
        }
        const productList = await this.productRepository.findProductByCategoryBrand(checkCategoryBrand.id_categoryBrand);
        if (!productList) {
            (0, response_1.errCode)(res, productList, "Không tìm thấy danh sách sản phẩm!");
            return;
        }
        (0, response_1.successCode)(res, productList);
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        product_repository_1.ProductRepository,
        brand_repository_1.BrandRepository,
        category_repository_1.CategoryRepository,
        category_brand_repository_1.CategoryBrandRepository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map