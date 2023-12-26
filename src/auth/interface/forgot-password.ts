import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ForgotPasswordInterface {
    @ApiProperty({ description: "email", type: String })
    email: string;
}