import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryBrandDto {
    @ApiProperty({ description: "id_brand", type: Number })
    id_brand: number;
    @ApiProperty({ description: "id_category", type: Number })
    id_category: number;
}
