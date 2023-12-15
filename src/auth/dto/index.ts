import { ApiProperty } from "@nestjs/swagger";

export class loginInterFace {
    @ApiProperty({ description: "email", type: String })
    email: string;

    @ApiProperty({ description: "password", type: String })
    password: string;
}

export class SignUpInterface {

    @ApiProperty({ description: "name", type: String })
    name: string;
    @ApiProperty({ description: "email", type: String })
    email: string;
    @ApiProperty({ description: "password", type: String })
    password: string;
    @ApiProperty({ description: "birthday", type: Date })
    birthday: Date | string;
    @ApiProperty({ description: "address", type: String })
    address: string;
    @ApiProperty({ description: "phone", type: String })
    phone: string;

    role: boolean;


}

export class UserPayloadDTO {
    id_user: number;
    name: string;
    email: string;
    password: string;
    birthday: Date;
    address: string;
    phone: string;
    role: boolean;
    accessToken?: string
}


export class UserDTO {
    name: string;
    email: string;
    password: string;
    birthday: Date;
    address: string;
    phone: string;
    role: boolean;
}

export interface UpdatePassInterface {
    id_user: number;
    password: string;
}