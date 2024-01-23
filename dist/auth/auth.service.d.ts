import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { LoginInterface } from './interface/login';
import { SignUpReqInterface } from './interface/sign-up';
import { ForgotPasswordInterface } from './interface/forgot-password';
import { AuthDto } from './dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPassInterface } from './interface/reset-pass';
import { Tokens } from './type/token.type';
import { refreshTokensInterface } from './interface/refresh-token';
export declare class AuthService {
    private jwtService;
    private config;
    private authRepository;
    private mailService;
    constructor(jwtService: JwtService, config: ConfigService, authRepository: AuthRepository, mailService: MailerService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    profile(res: Response, userId: number): Promise<void>;
    login(res: Response, user: LoginInterface): Promise<void>;
    loginAdmin(res: Response, user: LoginInterface): Promise<void>;
    signUp(res: any, user: SignUpReqInterface): Promise<void>;
    refreshToken(res: Response, user: refreshTokensInterface): Promise<void>;
    forgotPassword(res: any, user: ForgotPasswordInterface): Promise<void>;
    createTokenForgotPass(email: string, checkUser: AuthDto, res: any): Promise<{
        resetPasswordToken: string;
        resetPasswordExpire: Date;
    }>;
    resetPass(res: any, token: string, body: ResetPassInterface): Promise<void>;
    verifyEmail(res: any, token: string): Promise<void>;
    hashData(data: string): any;
    createToken(data: any, secret: string, expiresIn: string): string;
    getTokens(payload: AuthDto): Promise<Tokens>;
    updateRtHash(res: any, userId: number, rt: string): Promise<void>;
}
