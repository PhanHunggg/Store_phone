"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failCode = exports.errCode = exports.successCode = void 0;
const successCode = (res, data, message) => {
    return res.status(200).json({
        statusCode: "200",
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
//# sourceMappingURL=index.js.map