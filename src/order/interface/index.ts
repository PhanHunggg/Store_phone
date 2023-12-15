export interface OrderInterface {
    id_user: number;
    phone: string;
    address: string;
    payment_method: string;
    delivery_by: string;
    total: number;
    created_date: Date
}

export interface OrderItemInterface {
    id_order: number;
    id_product: number;
}
export interface CreateOrderInterface {
    id_user: number;
    phone: string;
    address: string;
    payment_method: string;
    delivery_by: string;
    total: number;
    id_product: number[]
}