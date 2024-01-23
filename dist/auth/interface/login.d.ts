export declare class LoginInterface {
    email: string;
    password: string;
}
export declare class LoginPayloadInterface {
    id_user: number;
    name: string;
    email: string;
    password: string;
    birthday: Date;
    address: string;
    phone: string;
    role: boolean;
    accessToken?: string;
    refreshToken?: string;
}
