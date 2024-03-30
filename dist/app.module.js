"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const product_module_1 = require("./product/product.module");
const brand_module_1 = require("./brand/brand.module");
const category_module_1 = require("./category/category.module");
const category_brand_module_1 = require("./category-brand/category-brand.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const color_module_1 = require("./color/color.module");
const user_module_1 = require("./user/user.module");
const order_module_1 = require("./order/order.module");
const core_1 = require("@nestjs/core");
const at_guards_1 = require("./common/guards/at.guards");
const mailer_1 = require("@nestjs-modules/mailer");
const path_1 = require("path");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, config_1.ConfigModule.forRoot({ isGlobal: true }), product_module_1.ProductModule, brand_module_1.BrandModule, category_module_1.CategoryModule, category_brand_module_1.CategoryBrandModule, cloudinary_module_1.CloudinaryModule, color_module_1.ColorModule, user_module_1.UserModule, order_module_1.OrderModule, mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => ({
                    transport: {
                        host: config.get("MAIL_HOST"),
                        secure: false,
                        auth: {
                            user: config.get("MAIL_USER"),
                            pass: config.get("MAIL_PASS"),
                        }
                    },
                    defaults: {
                        from: `"No Reply" <${config.get("MAIL_FORM")}>`
                    },
                    template: {
                        dir: (0, path_1.join)(__dirname, 'src/template-mail/email'),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true
                        }
                    },
                }),
                inject: [config_1.ConfigService]
            })],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: at_guards_1.AtGuard
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map