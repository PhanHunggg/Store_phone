import { Response } from 'express';
export declare const successCode: (res: Response, data: any, message?: string) => Response<any, Record<string, any>>;
export declare const errCode: (res: Response, data: any, message: string) => Response<any, Record<string, any>>;
export declare const failCode: (res: Response, message: string) => Response<any, Record<string, any>>;
export declare const createCode: (res: Response, data: any, message?: string) => Response<any, Record<string, any>>;
