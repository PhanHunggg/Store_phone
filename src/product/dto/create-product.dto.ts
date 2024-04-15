import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

class Storage {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "name", type: String })
    name: string;
}

class Color {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "name", type: String })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "hex", type: String })
    hex: string;
}

class Img {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "url", type: String })
    url: string;
}

export class CreateProductDTO {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: "brand", type: Number })
    brand: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: "categories", type: Number })
    categories: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "name", type: String })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "chip", type: String })
    chip: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: "price", type: Number })
    price: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: "original_price", type: Number })
    original_price: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "battery", type: String })
    battery: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: "quantity", type: Number })
    quantity: number;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ description: "new_release", type: Boolean })
    new_release: boolean;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "screen", type: String })
    screen: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "front_camera", type: String })
    front_camera: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "rear_camera", type: String })
    rear_camera: string;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ description: 'productItem', type: [Img] })
    img: Img[];

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ description: 'productItem', type: [Storage] })
    storage: Storage[];

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ description: 'productItem', type: [Color] })
    color: Color[];


}
