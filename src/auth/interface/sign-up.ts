import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { UserInterface } from "src/user/interface/user";
import { LoginPayloadInterface } from "./login";

export class SignUpReqInterface extends PartialType(UserInterface) {

}

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

export interface SignUpInterfaceRes extends LoginPayloadInterface { }