import { AuthGuard } from "@nestjs/passport";


export class RtGuards extends AuthGuard('jwt-rt') {
    constructor() {
        super();
    }
}