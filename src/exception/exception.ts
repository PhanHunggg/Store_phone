import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}

export class NotFoundException extends CustomException {
  constructor(message: string = 'Not Found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class UnauthorizedException extends CustomException {
  constructor(message: string = 'Unauthorized') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenException extends CustomException {
  constructor(message: string = 'Forbidden') {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class ConflictException extends CustomException {
  constructor(message: string = 'Conflict') {
    super(message, HttpStatus.CONFLICT);
  }
}

export class BadRequestException extends CustomException {
  constructor(message: string = 'Bad Request') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class InternalServerErrorException extends CustomException {
  constructor(message: string = 'Internal Server Error') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class PreconditionFailedException extends CustomException {
  constructor(message: string = 'Precondition Failed') {
    super(message, HttpStatus.PRECONDITION_FAILED);
  }
}
export class TooManyRequestsException extends CustomException {
  constructor(message: string = 'Too Many Request') {
    super(message, HttpStatus.TOO_MANY_REQUESTS);
  }
}