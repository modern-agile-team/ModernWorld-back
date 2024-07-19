import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Response } from "express";

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse<Response>();
        const refreshToken = data?.refreshToken;

        if (refreshToken) {
          response.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            domain: "localhost", // env 설정으로 바꿔야함
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
          });
        }

        delete data.refreshToken; // refreshToken을 응답에서 삭제
        return data;
      }),
    );
  }
}
