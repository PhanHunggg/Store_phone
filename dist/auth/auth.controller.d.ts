import { AuthService } from './auth.service';
import { LoginInterface } from './interface/login';
import { SignUpReqInterface } from './interface/sign-up';
import { ForgotPasswordInterface } from './interface/forgot-password';
import { ResetPassInterface } from './interface/reset-pass';
import { refreshTokensInterface } from './interface/refresh-token';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    profile(userId: number, res: Response): Promise<void>;
    login(res: any, body: LoginInterface): Promise<void>;
    loginAdmin(res: any, body: LoginInterface): Promise<void>;
    signUp(res: any, body: SignUpReqInterface): Promise<void>;
    forgotPassword(res: any, body: ForgotPasswordInterface): Promise<void>;
    refreshToken(res: Response, body: refreshTokensInterface): Promise<void>;
    resetPass(res: any, token: string, body: ResetPassInterface): Promise<void>;
    verifyEmail(res: any, token: string): Promise<void>;
}
