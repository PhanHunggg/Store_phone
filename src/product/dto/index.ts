import { ApiProperty } from "@nestjs/swagger";
import { ColorInterface, StorageInterface } from "../interface";




export class CreateProductInterface {
    @ApiProperty({ description: "id_brand", type: Number })
    id_brand: number;
    @ApiProperty({ description: "id_category", type: Number })
    id_category: number;
    @ApiProperty({ description: "name", type: String })
    name: string;
    @ApiProperty({ description: "chip", type: String })
    chip: string;
    @ApiProperty({ description: "price", type: Number })
    price: number;
    @ApiProperty({ description: "original_price", type: Number })
    original_price: number;
    @ApiProperty({ description: "battery", type: String })
    battery: string;
    @ApiProperty({ description: "quantity", type: Number })
    quantity: number;
    @ApiProperty({ description: "new_release", type: Boolean })
    new_release: boolean | string;
    @ApiProperty({ description: "screen", type: String })
    screen: string;
    @ApiProperty({ description: "front_camera", type: String })
    front_camera: string;
    @ApiProperty({ description: "rear_camera", type: String })
    rear_camera: string;
    @ApiProperty({ description: "img", type: Array<ColorInterface> })
    img: any[];
    @ApiProperty({ description: "color", type: Array<ColorInterface> })
    color: any[];
    @ApiProperty({ description: "storage", type: Array<StorageInterface> })
    storage: any[];


}

// export class ProductInterface {
//     id_categoryBrand: number;
//     name: string;
//     thumbnail: string;
//     chip: string;
//     price: number;
//     original_price: Number;
//     battery: string;
//     quantity: number;
//     new_release: boolean;
//     screen: string;
//     front_camera: string;
//     rear_camera: string;
// }

export class ProductDTO {
    id_product: number;
    id_categoryBrand: number;
    name: string;
    thumbnail: string;
    chip: string;
    price: number;
    original_price: Number;
    battery: string;
    quantity: number;
    new_release: boolean;
    screen: string;
    front_camera: string;
    rear_camera: string;
}

export class CreateProduct {
    categoryBrandMapping: {
        connect: {
            id_categoryBrand: number;
        }
    };
    name: string;
    thumbnail: string;
    chip: string;
    price: number;
    original_price: number;
    battery: string;
    quantity: number;
    new_release: boolean;
    screen: string;
    front_camera: string;
    rear_camera: string;
    img: any[];
    storage: any[];
    color: any[];
}

export interface UpdateProductInterface {
    id_brand: number;
    id_category: number;
    name: string;
    chip: string;
    price: number;
    original_price: number;
    battery: string;
    quantity: number;
    new_release: boolean;
    screen: string;
    front_camera: string;
    rear_camera: string;
    storage: any[]
    color: any[]
}

export interface UpdateProduct{
    id_categoryBrand: number;
    name: string;
    chip: string;
    price: number;
    original_price: number;
    battery: string;
    quantity: number;
    new_release: boolean;
    screen: string;
    front_camera: string;
    rear_camera: string;
    storage: any[]
    color: any[]
}

// export class CreateProductInterface {
//     @ApiProperty({ description: "id_brand", type: Number })
//     id_brand: number;
//     @ApiProperty({ description: "id_category", type: Number })
//     id_category: number;
//     @ApiProperty({ description: "name", type: String })
//     name: string;
//     @ApiProperty({ description: "chip", type: String })
//     chip: string;
//     @ApiProperty({ description: "price", type: Number })
//     price: number;
//     @ApiProperty({ description: "original_price", type: Number })
//     original_price: number;
//     @ApiProperty({ description: "battery", type: String })
//     battery: string;
//     @ApiProperty({ description: "quantity", type: Number })
//     quantity: number;
//     @ApiProperty({ description: "new_release", type: Boolean })
//     new_release: boolean | string;
//     @ApiProperty({ description: "screen", type: String })
//     screen: string;
//     @ApiProperty({ description: "front_camera", type: String })
//     front_camera: string;
//     @ApiProperty({ description: "rear_camera", type: String })
//     rear_camera: string;
//     @ApiProperty({ description: "color", type: Array<ColorInterface> })
//     color: any[];
//     @ApiProperty({ description: "storage", type: Array<StorageInterface> })
//     storage: any[];


// }