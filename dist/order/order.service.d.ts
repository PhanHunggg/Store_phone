import { OrderRepository } from './order.repository';
import { ProductRepository } from 'src/product/product.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateOrderInterface } from './interface/create-order';
export declare class OrderService {
    private orderRepository;
    private productRepository;
    private userRepository;
    constructor(orderRepository: OrderRepository, productRepository: ProductRepository, userRepository: UserRepository);
    getOrderList(res: any): Promise<void>;
    findOrderByIdUser(res: any, id: number): Promise<void>;
    createOrder(res: any, createOrder: CreateOrderInterface): Promise<void>;
    deleteOrder(res: any, id: number): Promise<void>;
    findOrderById(res: any, id: number): Promise<void>;
}
