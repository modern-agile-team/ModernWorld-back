import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { winstonLogger } from "./common/utils/logger/logger.config";
import { NestExpressApplication } from "@nestjs/platform-express";
import { BootstrapService } from "./bootstrap.service";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: winstonLogger,
  });
  const bootstrap = app.get(BootstrapService);

  bootstrap.setCors(app);
  bootstrap.setProxy(app);
  bootstrap.setSwagger(app);
  bootstrap.useGlobalPipes(app);
  bootstrap.useGlobalInterceptors(app);
  bootstrap.useCookieParser(app);

  await app.listen(3000);
}

bootstrap();
