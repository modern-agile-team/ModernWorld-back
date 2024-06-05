import { Module } from "@nestjs/common";
import { AchievementsController } from "./achievements.controller";
import { AchievementsService } from "./achievements.service";
import { AchievementsRepository } from "./achievements.repository";

@Module({
  controllers: [AchievementsController],
  providers: [AchievementsService, AchievementsRepository],
  exports: [AchievementsRepository],
})
export class AchievementsModule {}
