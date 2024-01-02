import { PartialType } from "@nestjs/swagger";
import { UserInterface } from "./user";

export class UpdateUserInterface extends PartialType(UserInterface) {}