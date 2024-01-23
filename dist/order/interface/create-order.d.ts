export declare class ProductItem {
    name: string;
    color: string;
    price: number;
    storage: string;
    quantity: number;
}
export declare class CreateOrderInterface {
    id_user: number;
    name: string;
    phone: string;
    address: string;
    payment_method: string;
    delivery_by: string;
    total: number;
    productItem: ProductItem[];
}
