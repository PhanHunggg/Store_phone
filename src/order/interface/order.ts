export class OrderInterface {
    id_user: number;
    name: string
    phone: string;
    address: string;
    payment_method: string;
    delivery_by: string;
    total: number;
    created_date: Date;
    productItem: any[]
}