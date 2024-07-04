import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const reqTime = Date.now();
    const userAgent = req.get("user-agent");
    const { method, originalUrl, ip } = req;

    res.on("finish", () => {
      const resTime = Date.now();
      const duration = resTime - reqTime;
      const { statusCode } = res;

      this.logger.log(
        `${ip} ${statusCode} ${duration}ms ${method} [${originalUrl}] | ${userAgent}`,
      );
    });

    next();
  }
}
