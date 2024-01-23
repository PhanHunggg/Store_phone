export declare class AuthDto {
    id_user: number;
    name: string;
    email: string;
    password: string;
    birthday: Date;
    address: string;
    phone: string;
    role: boolean;
    verifyEmail: boolean;
    verifyEmailToken: string;
    hashedRt: string;
    resetPasswordToken: string;
    resetPasswordExpire: Date;
}
