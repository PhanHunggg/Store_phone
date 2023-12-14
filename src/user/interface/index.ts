import { ApiProperty } from "@nestjs/swagger";

export class CreateUserInterface {
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

}
