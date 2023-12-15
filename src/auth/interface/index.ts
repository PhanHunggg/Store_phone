
export interface LoginInterface {
    email: string;
    password: string;
}

export interface SignUpInterface {

    name: string;
    email: string;
    password: string;
    birthday: Date | string;
    address: string;
    phone: string;

    role: boolean;


}

export interface LoginPayloadInterface {
    id_user: number;
    name: string;
    email: string;
    password: string;
    birthday: Date;
    address: string;
    phone: string;
    role: boolean;
    accessToken?: string
}

export interface UpdatePassInterface {
    id_user: number;
    password: string;
}