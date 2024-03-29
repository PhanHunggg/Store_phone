"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpInterface = exports.SignUpReqInterface = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_1 = require("../../user/interface/user");
class SignUpReqInterface extends (0, swagger_1.PartialType)(user_1.UserInterface) {
}
exports.SignUpReqInterface = SignUpReqInterface;
class SignUpInterface {
}
exports.SignUpInterface = SignUpInterface;
//# sourceMappingURL=sign-up.js.map