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

export class LoginPayloadInterface {
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