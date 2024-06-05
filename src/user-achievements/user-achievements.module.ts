import { Module } from "@nestjs/common";
import { UserAchievementsController } from "./user-achievements.controller";
import { UserAchievementsRepository } from "./user-achievements.repository";
import { UserAchievementsService } from "./user-achievements.service";
import { AchievementsRepository } from "src/achievements/achievements.repository";

@Module({
  imports: [AchievementsRepository],
  controllers: [UserAchievementsController],
  providers: [UserAchievementsRepository, UserAchievementsService],
  exports: [UserAchievementsRepository],
})
export class UserAchievementsModule {}
