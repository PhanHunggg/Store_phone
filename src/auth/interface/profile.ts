import { Prisma } from "@prisma/client";

export interface ProfileInterface {
    id_user: number,
    name: string,
    email: string,
    birthday: Date |string,
    address: string,
    phone: string
}

export interface ProfileOrderInterface {
  id_user: number;
  name: string;
  email: string;
  birthday: Date;
  address: string;
  phone: string;
  productItem: ProductItem2[];
}

interface ProductItem2 {
    id_order: number;
    id_user: number;
    name: string;
    phone: string;
    address: string;
    payment_method: string;
    delivery_by: string;
    total: number;
    created_date: Date;
    productItem: Prisma.JsonValue;
}
