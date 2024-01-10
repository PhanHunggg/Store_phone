import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsArray } from "class-validator";


export class ProductItem {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "name", type: String })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "color", type: String })
    color: string;

    @IsNotEmpty()
    @ApiProperty({ description: "price", type: Number })
    price: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "storage", type: String })
    storage: string;

    @IsNotEmpty()
    @ApiProperty({ description: "quantity", type: Number })
    quantity: number;
}
export class CreateOrderInterface {
    @IsNotEmpty()
    @ApiProperty({ description: "id_user", type: Number })
    id_user: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "name", type: String })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "phone", type: String })
    phone: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "address", type: String })
    address: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "payment_method", type: String })
    payment_method: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "delivery_by", type: String })
    delivery_by: string;

    @IsNotEmpty()
    @ApiProperty({ description: "total", type: Number })
    total: number;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ description: 'productItem', type: [ProductItem] })
    productItem: ProductItem[];
}

