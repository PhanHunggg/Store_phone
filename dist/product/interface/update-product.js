"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductInterface = exports.UpdateProductReqInterface = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_product_1 = require("./create-product");
class UpdateProductReqInterface extends (0, swagger_1.OmitType)(create_product_1.CreateProductReqInterface, ['img']) {
}
exports.UpdateProductReqInterface = UpdateProductReqInterface;
class UpdateProductInterface {
}
exports.UpdateProductInterface = UpdateProductInterface;
//# sourceMappingURL=update-product.js.map