"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const compression = require("compression");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 8080;
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use((0, helmet_1.default)());
    app.use(compression());
    app.enableCors();
    app.use(express.static("."));
    const config = new swagger_1.DocumentBuilder().setTitle("Swagger").addBearerAuth().build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("swagger", app, document);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map