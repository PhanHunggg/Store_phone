import { ApiProperty } from "@nestjs/swagger";

export class CreateBrandDto {
    @ApiProperty({ description: "name", type: String })
    name: string
}
