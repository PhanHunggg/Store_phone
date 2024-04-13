export declare class LoginInterface {
    email: string;
    password: string;
}
export interface LoginPayloadInterface {
    id_user: number;
    name: string;
    email: string;
    birthday: Date;
    address: string;
    phone: string;
    accessToken?: string;
    refreshToken?: string;
    role?: boolean;
}
