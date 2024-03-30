import { PrismaClient } from "@prisma/client";
import { SignUpInterface } from "./interface/sign-up";
export declare class AuthRepository {
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    signUp(userData: SignUpInterface): Promise<{
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
        resetPasswordToken: string;
        resetPasswordExpire: Date;
        hashedRt: string;
    }>;
    checkEmailUser(email: string): Promise<{
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
        resetPasswordToken: string;
        resetPasswordExpire: Date;
        hashedRt: string;
    }>;
    checkUserById(id: number): Promise<{
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
        resetPasswordToken: string;
        resetPasswordExpire: Date;
        hashedRt: string;
    }>;
    checkUserOrderById(id_user: number): Promise<{
        order: {
            id_order: number;
            id_user: number;
            phone: string;
            address: string;
            payment_method: string;
            delivery_by: string;
            total: number;
            created_date: Date;
            productItem: import(".prisma/client").Prisma.JsonValue;
            name: string;
        }[];
    } & {
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
        resetPasswordToken: string;
        resetPasswordExpire: Date;
        hashedRt: string;
    }>;
    checkUserByTokenPass(token: string): Promise<{
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
        resetPasswordToken: string;
        resetPasswordExpire: Date;
        hashedRt: string;
    }>;
    resetPass(password: string, id: number): Promise<{
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
        resetPasswordToken: string;
        resetPasswordExpire: Date;
        hashedRt: string;
    }>;
}
