import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingControllerResponseInterceptors implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const res: Response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        console.log(`응답 시간: ${duration}ms`);
        console.log("응답 상태 코드:", res.statusCode);
      }),
    );
  }
}
