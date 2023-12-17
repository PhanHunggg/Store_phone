export interface OrderInterface {
    id_user: number;
    phone: string;
    address: string;
    payment_method: string;
    delivery_by: string;
    total: number;
    created_date: Date
}