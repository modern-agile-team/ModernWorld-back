import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { winstonLogger } from "./config/logger.config";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: winstonLogger,
  });

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
        description: "Enter JWT token",
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
