"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCode = exports.failCode = exports.errCode = exports.successCode = void 0;
const common_1 = require("@nestjs/common");
const successCode = (res, data, message) => {
    return res.status(common_1.HttpStatus.OK).json({
        statusCode: common_1.HttpStatus.OK,
        message: message ? message : "Xử lý thành công",
        content: data,
    });
};
exports.successCode = successCode;
const errCode = (res, data, message) => {
    return res.status(400).json({
        statusCode: "400",
        message,
        content: data,
    });
};
exports.errCode = errCode;
const failCode = (res, message) => {
    return res.status(500).json({
        statusCode: "500",
        message,
    });
};
exports.failCode = failCode;
const createCode = (res, data, message) => {
    return res.status(common_1.HttpStatus.CREATED).json({
        statusCode: common_1.HttpStatus.CREATED,
        message: message ? message : "Create success",
        content: data,
    });
};
exports.createCode = createCode;
//# sourceMappingURL=index.js.map