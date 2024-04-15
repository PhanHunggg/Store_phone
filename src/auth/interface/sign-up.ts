import { LoginResInterface } from "./login";
export interface SignUpInterface {
    name: string;
    email: string;
    password: string;
    birthday: Date | string;
    address: string;
    phone: string;
    role: boolean;
    verifyEmail: boolean;
    verifyEmailToken: string;
}

export interface SignUpInterfaceRes extends LoginResInterface { }