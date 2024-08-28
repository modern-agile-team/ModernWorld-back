import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { winstonLogger } from "./common/utils/logger/logger.config";
import * as cookieParser from "cookie-parser";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: winstonLogger,
  });

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.set("trust proxy", true);

  const config = new DocumentBuilder()
    .setTitle("Modern World API")
    .setDescription("API of Modern World")
    .setVersion("0.1")
    .addCookieAuth(
      "refreshToken-cookie",
      {
        type: "http",
        in: "Header",
        scheme: "Bearer",
        description: "리프레시 토큰 입력",
      },
      "refresh-token",
    )
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        name: "JWT",
        description: "액세스 토큰 입력",
        in: "header",
      },
      "access-token",
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
