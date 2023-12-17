export interface UpdateProductReqInterface {
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