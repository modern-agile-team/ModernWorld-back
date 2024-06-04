import { Controller, Get } from "@nestjs/common";
import { AchievementsService } from "./achievements.service";

@Controller("achievements")
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  getAchievements() {
    return this.achievementsService.getAchievements();
  }
}
