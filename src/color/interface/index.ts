import { ApiProperty } from "@nestjs/swagger";

export class ColorInterface {

    @ApiProperty({ description: "name", type: String })
    name: string;

    @ApiProperty({ description: "hex", type: String })
    hex: string
}