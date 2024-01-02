import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class BrandInterface {
    name: string
    img: string
}


export class CreateBrandInterface {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "name", type: String })
    name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "banner", type: String })
    banner: string
}
