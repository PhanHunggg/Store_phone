import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ColorDTO{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "name", type: String })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "hex", type: String })
    hex: string
}