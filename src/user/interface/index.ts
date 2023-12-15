
export interface CreateUserInterface {
    name: string;
    email: string;
    password: string;
    birthday: Date | string;
    address: string;
    phone: string;

}


export interface UserInterface {
    name: string;
    email: string;
    password: string;
    birthday: Date;
    address: string;
    phone: string;
    role: boolean
}