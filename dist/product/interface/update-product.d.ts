import { CreateProductReqInterface } from "./create-product";
declare const UpdateProductReqInterface_base: import("@nestjs/common").Type<Omit<CreateProductReqInterface, "img">>;
export declare class UpdateProductReqInterface extends UpdateProductReqInterface_base {
}
export declare class UpdateProductInterface {
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
    storage: any[];
    color: any[];
}
export {};
