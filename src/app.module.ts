import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ItemService } from './item/item.service';
import { ItemController } from './item/item.controller';
import { ItemModule } from './item/item.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ItemModule],
  // isGlobal: ConfigModule을 AppModul 이외의 모듈에서 반복 import할 필요 없는 전역 모듈로 설정.
  controllers: [AppController, ItemController],
  providers: [AppService, ConfigService, ItemService],
  // 앵간하면 nestJS에서 권장하는 방법인 ConfigService를 이용하여 환경변수 값을 사용해야함.
})
export class AppModule {}
