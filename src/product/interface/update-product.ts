import { OmitType } from "@nestjs/swagger";
import { CreateProductReqInterface } from "./create-product";

export class UpdateProductReqInterface extends OmitType(CreateProductReqInterface, ['img'] as const) { }

export class UpdateProductInterface {
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