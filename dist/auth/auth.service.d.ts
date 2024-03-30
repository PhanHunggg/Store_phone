import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { LoginInterface, LoginPayloadInterface } from './interface/login';
import { SignUpInterfaceRes, SignUpReqInterface } from './interface/sign-up';
import { ForgotPasswordInterface, TokenForgotInterface } from './interface/forgot-password';
import { AuthDto } from './dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPassInterface } from './interface/reset-pass';
import { refreshTokensInterface } from './interface/refresh-token';
import { ProfileOrderInterface } from './interface/profile';
import { Response } from 'express';
export declare class AuthService {
    private jwtService;
    private config;
    private authRepository;
    private mailService;
    constructor(jwtService: JwtService, config: ConfigService, authRepository: AuthRepository, mailService: MailerService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    profile(userId: number): Promise<ProfileOrderInterface>;
    login(res: Response, user: LoginInterface): Promise<LoginPayloadInterface>;
    loginAdmin(user: LoginInterface): Promise<LoginPayloadInterface>;
    signUp(user: SignUpReqInterface): Promise<SignUpInterfaceRes>;
    refreshToken(res: Response, user: refreshTokensInterface): Promise<void>;
    forgotPassword(res: any, user: ForgotPasswordInterface): Promise<TokenForgotInterface>;
    createTokenForgotPass(email: string, checkUser: AuthDto, res: any): Promise<{
        resetPasswordToken: string;
        resetPasswordExpire: Date;
    }>;
    resetPass(res: any, token: string, body: ResetPassInterface): Promise<void>;
    verifyEmail(res: any, token: string): Promise<void>;
    private sendVerificationEmail;
    private formatResponse;
    private hashData;
    private createToken;
    private getTokens;
    private updateRtHash;
}
