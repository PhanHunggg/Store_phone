import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { Regexp, RegexpMessage } from "src/constants";

export class LoginDTO {
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
}