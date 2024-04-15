import { PartialType } from "@nestjs/swagger";
import { SignUpDTO } from "src/auth/dto/signup.dto";

export class UpdateUserDTO extends PartialType(SignUpDTO) {}