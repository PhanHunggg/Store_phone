
export interface LoginResInterface {
    id_user: number;
    name: string;
    email: string;
    birthday: Date;
    address: string;
    phone: string;
    accessToken?: string
    refreshToken?: string
    role?: boolean
}
