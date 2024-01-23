"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicGuard = void 0;
const passport_1 = require("@nestjs/passport");
class PublicGuard extends (0, passport_1.AuthGuard)('jwt-public') {
    constructor() {
        super();
    }
}
exports.PublicGuard = PublicGuard;
//# sourceMappingURL=jwt-public.guards.js.map