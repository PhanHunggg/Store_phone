import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
export const successCode = (res: Response, data: any, message?: string) => {
    return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: message ? message : "Xử lý thành công",
        content: data,
    })
}

export const createCode = (res: Response, data: any, message?: string) => {
    return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: message ? message : "Create success",
        content: data,
    })
}