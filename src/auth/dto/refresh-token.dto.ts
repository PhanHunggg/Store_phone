import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class refreshTokensDTO {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: "id_user", type: Number })
    id_user: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "email", type: String })
    refresh_token: string;
}