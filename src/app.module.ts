import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TasksModule } from "./tasks/tasks.module";
import { LoggerModule } from "./common/utils/logger/logger.module";
import { SseModule } from "./sse/sse.module";
import { RedisModule } from "./auth/redis/redis.module";
import { ApiModule } from "./api.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    PrismaModule,
    SseModule,
    LoggerModule,
    TasksModule,
    RedisModule,
    ApiModule,
  ],
  // isGlobal: ConfigModule을 AppModul 이외의 모듈에서 반복 import할 필요 없는 전역 모듈로 설정.
  providers: [ConfigService],
  // 앵간하면 nestJS에서 권장하는 방법인 ConfigService를 이용하여 환경변수 값을 사용해야함.
})
export class AppModule {}
