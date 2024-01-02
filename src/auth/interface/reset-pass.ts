import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ResetPassInterface{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "password", type: String })
    password: string
}