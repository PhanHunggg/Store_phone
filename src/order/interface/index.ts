import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderInterface {
    @ApiProperty({ description: "id_user", type: Number })
    id_user: number;
    @ApiProperty({ description: "phone", type: String })
    phone: string;
    @ApiProperty({ description: "address", type: String })
    address: string;
    @ApiProperty({ description: "payment_method", type: String })
    payment_method: string;
    @ApiProperty({ description: "delivery_by", type: String })
    delivery_by: string;
    @ApiProperty({ description: "total", type: Number })
    total: number;
    @ApiProperty({ description: "id_product", type: Array<Number> })
    id_product: number[]
}