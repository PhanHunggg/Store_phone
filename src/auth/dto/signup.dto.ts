import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { Regexp, RegexpMessage } from "../../constants"

export class SignUpDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "name", type: String })
    @Matches(Regexp.NAME, "", {
        message: RegexpMessage.NAME
    })
    name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: RegexpMessage.EMAIL })
    @ApiProperty({ description: "email", type: String })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "password", type: String })
    @Matches(Regexp.PASSWORD, "", {
        message: RegexpMessage.PASSWORD
    })
    password: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "birthday", type: String })
    @Matches(Regexp.BIRTHDAY, "", {
        message: RegexpMessage.BIRTHDAY
    })
    birthday: Date | string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "address", type: String })
    address: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "phone", type: String })
    @Matches(Regexp.PHONE, "", {
        message: RegexpMessage.PHONE
    })
    phone: string;

    role?: boolean;
}