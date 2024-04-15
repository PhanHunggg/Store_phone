import { Injectable, NotFoundException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ProfileInterface } from 'src/auth/interface/profile';
import { User } from '@prisma/client';
import { UpdateUserDTO } from 'src/user/dto/update-user.dto';

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
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    async findUser(id: number): Promise<ProfileInterface> {
        try {
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
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    async updateUser(id: number, updateUser: UpdateUserDTO): Promise<ProfileInterface> {
        try {
            const user = await this.userRepository.findUser(id)

            if (!user) {
                throw new NotFoundException("Không tìm thấy user");
            }

            if (typeof updateUser.birthday === "string") {
                updateUser.birthday = new Date(updateUser.birthday)
            }

            const newData = await this.userRepository.updateUser(id, updateUser);

            const filteredUser: ProfileInterface = {
                id_user: newData.id_user,
                name: newData.name,
                email: newData.email,
                birthday: newData.birthday,
                address: newData.address,
                phone: newData.phone,
            };

            return filteredUser
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    async deleteUser(id: number): Promise<ProfileInterface> {
        try {
            const user = await this.userRepository.findUser(id)

            if (!user) {
                throw new NotFoundException("Không tìm thấy user");
            }
            const newData = await this.userRepository.delete(id);

            const filteredUser: ProfileInterface = {
                id_user: newData.id_user,
                name: newData.name,
                email: newData.email,
                birthday: newData.birthday,
                address: newData.address,
                phone: newData.phone,
            };

            return filteredUser
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }
}