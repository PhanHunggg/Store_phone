"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const response_1 = require("../response");
const user_repository_1 = require("./user.repository");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.prisma = new client_1.PrismaClient();
    }
    async getUserList(res) {
        try {
            const checkUser = await this.userRepository.getUserList();
            const filteredUsers = checkUser.map((user) => ({
                id_user: user.id_user,
                name: user.name,
                email: user.email,
                birthday: user.birthday,
                address: user.address,
                phone: user.phone
            }));
            (0, response_1.successCode)(res, filteredUsers);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async findUser(res, id) {
        try {
            const checkUser = await this.userRepository.findUser(id);
            if (!checkUser) {
                (0, response_1.errCode)(res, checkUser, "Không tìm thấy user");
                return;
            }
            const filteredUser = {
                id_user: checkUser.id_user,
                name: checkUser.name,
                email: checkUser.email,
                birthday: checkUser.birthday,
                address: checkUser.address,
                phone: checkUser.phone,
            };
            (0, response_1.successCode)(res, filteredUser);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async deleteUser(res, id) {
        try {
            const checkUser = await this.userRepository.findUser(id);
            if (!checkUser) {
                (0, response_1.errCode)(res, checkUser, "Không tìm thấy user");
                return;
            }
            await this.userRepository.delete(id);
            (0, response_1.successCode)(res, "");
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
    async updateUser(res, id, user) {
        try {
            const checkUserById = await this.userRepository.findUser(id);
            if (user.email !== checkUserById.email) {
                const checkEmailUser = await this.userRepository.findUserByEmail(user.email);
                if (checkEmailUser) {
                    (0, response_1.errCode)(res, checkEmailUser.email, "Email đã tồn tại!");
                    return;
                }
            }
            let birthDay;
            if (typeof user.birthday === "string") {
                birthDay = new Date(user.birthday);
            }
            if (!user.role)
                user.role = false;
            const newData = {
                name: user.name,
                email: user.email,
                password: user.password,
                birthday: birthDay,
                address: user.address,
                phone: user.phone,
                role: user.role
            };
            await this.userRepository.updateUser(id, newData);
            (0, response_1.successCode)(res, newData);
        }
        catch (error) {
            (0, response_1.failCode)(res, error.message);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map