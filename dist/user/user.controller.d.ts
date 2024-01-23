import { UserService } from './user.service';
import { UpdateUserInterface } from './interface/update-user';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserList(res: any): Promise<void>;
    findUser(res: any, id: string): Promise<void>;
    deleteUser(res: any, id: string): Promise<void>;
    updateUser(res: any, id: string, body: UpdateUserInterface): Promise<void>;
}
