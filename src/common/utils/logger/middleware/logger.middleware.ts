import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const reqTime = Date.now();
    const userAgent = req.get("user-agent");
    const ip = req.headers["x-forwarded-for"] || req.ip; //proxy 서버를 신뢰 하도록 하는 설정 필요할듯.
    const { method, originalUrl, protocol } = req;

    res.on("finish", () => {
      const resTime = Date.now();
      const duration = resTime - reqTime;
      const { statusCode } = res;

      this.logger.log(
        `${ip} ${statusCode} ${duration}ms ${protocol} ${method} [${originalUrl}] | ${userAgent}`,
      );
    });

    next();
  }
}
