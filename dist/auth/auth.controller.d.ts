import { AuthService } from './auth.service';
import { LoginInterface } from './interface/login';
import { SignUpReqInterface } from './interface/sign-up';
import { ForgotPasswordInterface } from './interface/forgot-password';
import { ResetPassInterface } from './interface/reset-pass';
import { refreshTokensInterface } from './interface/refresh-token';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    profile(userId: number, res: Response): Promise<Response>;
    login(res: Response, body: LoginInterface): Promise<Response>;
    loginAdmin(res: Response, body: LoginInterface): Promise<Response>;
    signUp(res: Response, body: SignUpReqInterface): Promise<Response>;
    forgotPassword(res: Response, body: ForgotPasswordInterface): Promise<Response>;
    refreshToken(res: Response, body: refreshTokensInterface): Promise<Response>;
    resetPass(res: Response, token: string, body: ResetPassInterface): Promise<Response>;
    verifyEmail(res: Response, token: string): Promise<Response<any, Record<string, any>>>;
}
