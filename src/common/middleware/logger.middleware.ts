import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const reqTime = Date.now();
    const userAgent = req.get("user-agent");
    const { method, originalUrl, ip } = req;

    next();

    const resTime = Date.now();
    const duration = resTime - reqTime;
    const { statusCode } = res;

    //userAgent의 값은 일부러 넣지 않았습니다.
    this.logger.log(
      `${method} [${originalUrl}] IP : ${ip} ${duration}ms ${statusCode}`,
    );
  }
}
