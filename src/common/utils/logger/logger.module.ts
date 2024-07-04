import {
  Global,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common";
import { LoggerMiddleware } from "./middleware/logger.middleware";

@Global()
@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
