import { Module } from "@nestjs/common";
import { LikesController } from "./likes.controller";
import { LikesService } from "./likes.service";
import { LikesRepository } from "./likes.repository";
import { UsersModule } from "src/users/users.module";
import { LegendsModule } from "src/legends/legends.module";
import { AlarmsModule } from "src/alarms/alarms.module";
import { SseModule } from "src/sse/sse.module";
import { UserAchievementsModule } from "src/user-achievements/user-achievements.module";

@Module({
  imports: [
    UsersModule,
    LegendsModule,
    AlarmsModule,
    SseModule,
    UserAchievementsModule,
  ],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository],
})
export class LikesModule {}
