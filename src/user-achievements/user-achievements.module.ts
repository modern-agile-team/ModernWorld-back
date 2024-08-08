import { forwardRef, Module } from "@nestjs/common";
import { UserAchievementsController } from "./user-achievements.controller";
import { UserAchievementsRepository } from "./user-achievements.repository";
import { UserAchievementsService } from "./user-achievements.service";
import { AchievementsModule } from "src/achievements/achievements.module";
import { LegendsModule } from "src/legends/legends.module";
import { SseModule } from "src/sse/sse.module";
import { AlarmsModule } from "src/alarms/alarms.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    AchievementsModule,
    SseModule,
    AlarmsModule,
    AchievementsModule,
    LegendsModule,
  ],
  controllers: [UserAchievementsController],
  providers: [UserAchievementsRepository, UserAchievementsService],
  exports: [UserAchievementsRepository, UserAchievementsService],
})
export class UserAchievementsModule {}
