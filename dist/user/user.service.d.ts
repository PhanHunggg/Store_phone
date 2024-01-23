import { PrismaClient } from '@prisma/client';
import { UserRepository } from './user.repository';
import { UpdateUserInterface } from './interface/update-user';
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getUserList(res: any): Promise<void>;
    findUser(res: any, id: number): Promise<void>;
    deleteUser(res: any, id: number): Promise<void>;
    updateUser(res: any, id: number, user: UpdateUserInterface): Promise<void>;
}
