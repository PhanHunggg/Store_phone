export class OrderDTO {
    id_user: number;
    phone: string;
    address: string;
    payment_method: string;
    delivery_by: string;
    total: number;
    created_date: Date
}

export class OrderItemDTO {
    id_order: number;
    id_product: number;
}