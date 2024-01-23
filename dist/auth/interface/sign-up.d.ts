import { UserInterface } from "src/user/interface/user";
declare const SignUpReqInterface_base: import("@nestjs/common").Type<Partial<UserInterface>>;
export declare class SignUpReqInterface extends SignUpReqInterface_base {
}
export declare class SignUpInterface {
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
export {};
