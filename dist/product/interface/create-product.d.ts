declare class Storage {
    name: string;
}
declare class Color {
    name: string;
    hex: string;
}
declare class Img {
    url: string;
}
export declare class CreateProductReqInterface {
    brand: number;
    categories: number;
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
    img: Img[];
    storage: Storage[];
    color: Color[];
}
export declare class CreateProductInterface {
    categoryBrandMapping: {
        connect: {
            id_categoryBrand: number;
        };
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
    color: any[];
    storage: any[];
}
export {};
