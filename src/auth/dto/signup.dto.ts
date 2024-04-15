import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignUpDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "name", type: String })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "email", type: String })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "password", type: String })
    password: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "birthday", type: String })
    birthday: Date | string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "address", type: String })
    address: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "phone", type: String })
    phone: string;

    role?: boolean;
}