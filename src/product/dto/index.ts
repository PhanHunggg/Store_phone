

export class CreateProductDto {

    id_brand: number;
    id_category: number;
    name: string;
    chip: string;
    price: number;
    original_price: number;
    battery: string;
    quantity: number;
    new_release: boolean | string;
    screen: string;
    front_camera: string;
    rear_camera: string;
    color: any[];
    storage: any[];


}

export class ProductInterface {
    id_categoryBrand: number;
    name: string;
    thumbnail: string;
    chip: string;
    price: number;
    original_price: Number;
    battery: string;
    type: string;
    quantity: number;
    new_release: boolean;
    screen: number;
    front_camera: string;
    rear_camera: string;
}