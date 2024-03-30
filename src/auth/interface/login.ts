import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginInterface {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "email", type: String })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "password", type: String })
    password: string;
}

export interface LoginPayloadInterface {
    id_user: number;
    name: string;
    email: string;
    birthday: Date;
    address: string;
    phone: string;
    accessToken?: string
    refreshToken?: string
}