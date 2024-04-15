import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCategoryBrandDTO {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: "id_brand", type: Number })
    id_brand: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: "id_category", type: Number })
    id_category: number;
}
