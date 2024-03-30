"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooManyRequestsException = exports.PreconditionFailedException = exports.InternalServerErrorException = exports.BadRequestException = exports.ConflictException = exports.ForbiddenException = exports.UnauthorizedException = exports.NotFoundException = exports.CustomException = void 0;
const common_1 = require("@nestjs/common");
class CustomException extends common_1.HttpException {
    constructor(message, status) {
        super(message, status);
    }
}
exports.CustomException = CustomException;
class NotFoundException extends CustomException {
    constructor(message = 'Not Found') {
        super(message, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotFoundException = NotFoundException;
class UnauthorizedException extends CustomException {
    constructor(message = 'Unauthorized') {
        super(message, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends CustomException {
    constructor(message = 'Forbidden') {
        super(message, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenException = ForbiddenException;
class ConflictException extends CustomException {
    constructor(message = 'Conflict') {
        super(message, common_1.HttpStatus.CONFLICT);
    }
}
exports.ConflictException = ConflictException;
class BadRequestException extends CustomException {
    constructor(message = 'Bad Request') {
        super(message, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.BadRequestException = BadRequestException;
class InternalServerErrorException extends CustomException {
    constructor(message = 'Internal Server Error') {
        super(message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.InternalServerErrorException = InternalServerErrorException;
class PreconditionFailedException extends CustomException {
    constructor(message = 'Precondition Failed') {
        super(message, common_1.HttpStatus.PRECONDITION_FAILED);
    }
}
exports.PreconditionFailedException = PreconditionFailedException;
class TooManyRequestsException extends CustomException {
    constructor(message = 'Too Many Request') {
        super(message, common_1.HttpStatus.TOO_MANY_REQUESTS);
    }
}
exports.TooManyRequestsException = TooManyRequestsException;
//# sourceMappingURL=exception.js.map