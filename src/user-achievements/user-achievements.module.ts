import { Module } from "@nestjs/common";
import { UserAchievementsController } from "./user-achievements.controller";
import { UserAchievementsRepository } from "./user-achievements.repository";
import { UserAchievementsService } from "./user-achievements.service";
import { AchievementsModule } from "src/achievements/achievements.module";

@Module({
  imports: [AchievementsModule],
  controllers: [UserAchievementsController],
  providers: [UserAchievementsRepository, UserAchievementsService],
})
export class UserAchievementsModule {}
