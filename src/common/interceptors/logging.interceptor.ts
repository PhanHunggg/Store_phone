import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;

        console.log(`Đã nhận yêu cầu ${method} ${url}`);

        const now = Date.now();
        return next.handle().pipe(
            tap(() => console.log(`Nhận phản hồi trong ${Date.now() - now}ms`)),
            tap(response => {
                const statusCode = context.switchToHttp().getResponse().statusCode;
                console.log(`statusCode: ${statusCode}`);
            }),
        );
    }
}
