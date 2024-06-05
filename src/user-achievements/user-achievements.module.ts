import { Module } from "@nestjs/common";
import { UserAchievementsController } from "./user-achievements.controller";
import { UserAchievementsRepository } from "./user-achievements.repository";

@Module({
  controllers: [UserAchievementsController],
  providers: [UserAchievementsRepository],
  exports: [UserAchievementsRepository],
})
export class UserAchievementsModule {}
