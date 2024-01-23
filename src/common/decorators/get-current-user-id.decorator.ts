import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { JwtPayload } from "src/auth/type/jwtPayload.type";

export const GetCurrentUserId = createParamDecorator(
    (_: undefined, context: ExecutionContext): number => {
        const request = context.switchToHttp().getRequest();
        const user = request.user as JwtPayload;
        return user ? user.id_user : null;
    }
)