import { Module } from "@nestjs/common";
import { UserAchievementsController } from "./user-achievements.controller";
import { UserAchievementsRepository } from "./user-achievements.repository";
import { UserAchievementsService } from './user-achievements.service';

@Module({
  controllers: [UserAchievementsController],
  providers: [UserAchievementsRepository, UserAchievementsService],
  exports: [UserAchievementsRepository],
})
export class UserAchievementsModule {}
