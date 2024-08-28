import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse<Response>();
        const refreshToken = data?.refreshToken;

        if (refreshToken) {
          response.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            domain: this.configService.get<string>("COOKIE_DOMAIN"),
            secure: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
          });
        }

        // delete data.refreshToken; // refreshToken을 응답에서 삭제
        return data;
      }),
    );
  }
}
