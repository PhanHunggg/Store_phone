import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UpdateUserInterface } from './interface/update-user';
import { UserInterface } from './interface/user';
import { ProfileInterface } from 'src/auth/interface/profile';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async getUserList(): Promise<ProfileInterface[]> {
        try {
            const users = await this.userRepository.getUserList()

            const filteredUsers: ProfileInterface[] = users.map((user) => ({
                id_user: user.id_user,
                name: user.name,
                email: user.email,
                birthday: user.birthday,
                address: user.address,
                phone: user.phone
            }));

            return filteredUsers;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findUser(id: number): Promise<ProfileInterface> {
        const user = await this.userRepository.findUser(id)

        if (!user) {
            throw new NotFoundException("Không tìm thấy user");
        }

        const filteredUser: ProfileInterface = {
            id_user: user.id_user,
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            address: user.address,
            phone: user.phone,
        };

        return filteredUser;
    }

    async updateUser(id: number, updateUser: UserInterface): Promise<UserInterface>  {
        const user = await this.userRepository.findUser(id)

        if (!user) {
            throw new NotFoundException("Không tìm thấy user");
        }

        try {
            return await this.userRepository.updateUser(id, updateUser);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository.findUser(id)

        if (!user) {
            throw new NotFoundException("Không tìm thấy user");
        }

        try {
            await this.userRepository.delete(id);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}