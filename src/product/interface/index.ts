export class ColorInterface {
    name: string;
    hex: string;
    
}

export class StorageInterface {
    name: string;
}


export interface CreateProductReqInterface {
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
    img: any[];
    color: any[];
    storage: any[];


}

export interface ProductInterface {
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

export interface UpdateProductReqInterface {
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

export interface UpdateProductInterface {
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

