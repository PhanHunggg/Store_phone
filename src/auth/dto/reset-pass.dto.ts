import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";
import { Regexp, RegexpMessage } from "src/constants";

export class ResetPassDTO {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Old password", type: String })
    @Matches(Regexp.PASSWORD, "", {
        message: RegexpMessage.PASSWORD
    })
    old_password: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "password", type: String })
    @Matches(Regexp.PASSWORD, "", {
        message: RegexpMessage.PASSWORD
    })
    password: string;
}