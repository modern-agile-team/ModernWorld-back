import {
  ClassSerializerInterceptor,
  Injectable,
  ValidationPipe,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

@Injectable()
export class BootstrapService {
  setCors(app: NestExpressApplication) {
    app.enableCors({
      origin: true,
      credentials: true,
    });
  }

  setProxy(app: NestExpressApplication) {
    app.set("trust proxy", true);
  }

  setSwagger(app: NestExpressApplication) {
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
  }

  useGlobalPipes(app: NestExpressApplication) {
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
  }

  useGlobalInterceptors(app: NestExpressApplication) {
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
  }

  useCookieParser(app: NestExpressApplication) {
    app.use(cookieParser());
  }
}
