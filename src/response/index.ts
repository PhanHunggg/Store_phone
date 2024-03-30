import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
export const successCode = (res: Response, data: any, message?: string) => {
    return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: message ? message : "Xử lý thành công",
        content: data,
    })
}

export const errCode = (res: Response, data: any, message: string) => {
    return res.status(400).json({
        statusCode: "400",
        message,
        content: data,
    })
}

export const failCode = (res: Response, message: string) => {
    return res.status(500).json({
        statusCode: "500",
        message,
    })
}

export const createCode = (res: Response, data: any, message?: string) => {
    return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: message ? message : "Create success",
        content: data,
    })
}