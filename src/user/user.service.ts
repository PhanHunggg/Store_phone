import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { errCode, failCode, successCode } from 'src/response';
import { UserRepository } from './user.repository';
import { UpdateUserInterface } from './interface/update-user';
import { UserInterface } from './interface/user';

@Injectable()
export class UserService {

    constructor(private userRepository: UserRepository) { }

    prisma = new PrismaClient()

    async getUserList(res: any) {
        try {
            const checkUser = await this.userRepository.getUserList()

            if (!!!checkUser.length) {
                errCode(res, checkUser, "Danh sách user rỗng!")
                return
            }
            successCode(res, checkUser)
        } catch (error) {
            failCode(res, error.message)

        }
    }

    async findUser(res: any, id: number) {
        try {
            const checkUser = await this.userRepository.findUser(id)

            if (!checkUser) {
                errCode(res, checkUser, "Không tìm thấy user")
                return
            }
            successCode(res, checkUser)
        } catch (error) {
            failCode(res, error.message)

        }
    }

    async deleteUser(res: any, id: number) {
        try {
            const checkUser = await this.userRepository.findUser(id)

            if (!checkUser) {
                errCode(res, checkUser, "Không tìm thấy user")
                return
            }

            await this.userRepository.delete(id)

            successCode(res, "")
        } catch (error) {
            failCode(res, error.message)

        }
    }

    async updateUser(res: any, id: number, user: UpdateUserInterface) {
        try {
            const checkUserById = await this.userRepository.findUser(id);

            if (user.email !== checkUserById.email) {

                const checkEmailUser = await this.userRepository.findUserByEmail(user.email)

                if (checkEmailUser) {
                    errCode(res, checkEmailUser.email, "Email đã tồn tại!")
                    return
                }
            }
            let birthDay: Date

            if (typeof user.birthday === "string") {
                birthDay = new Date(user.birthday)
            }

            if (!user.role) user.role = false

            const newData: UserInterface = {
                name: user.name,
                email: user.email,
                password: user.password,
                birthday: birthDay,
                address: user.address,
                phone: user.phone,
                role: user.role
            }

            await this.userRepository.updateUser(id, newData)

            successCode(res, newData)
        } catch (error) {
            failCode(res, error.message)

        }
    }
}
