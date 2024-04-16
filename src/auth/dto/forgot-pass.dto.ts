import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { RegexpMessage } from "src/constants";

export class ForgotPasswordDTO {
    @IsNotEmpty()
    @IsEmail({}, { message: RegexpMessage.EMAIL })
    @ApiProperty({ description: "email", type: String })
    email: string;
}