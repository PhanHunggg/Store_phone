import { ApiProperty } from "@nestjs/swagger";

export class BrandDto {
    name: string
    img: string
}


export class CreateBrandInterface {
    @ApiProperty({ description: "name", type: String })
    name: string
}
