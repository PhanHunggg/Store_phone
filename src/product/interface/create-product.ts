
export interface CreateProductReqInterface {
    brand: number;
    categories: number;
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
    img: any[];
    color: any[];
    storage: any[];


}


export class CreateProductInterface {
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