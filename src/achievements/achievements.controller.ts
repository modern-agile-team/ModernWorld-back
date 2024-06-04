import { Controller, Get } from "@nestjs/common";
import { AchievementsService } from "./achievements.service";

@Controller("achievements")
export class AchievementsController {
  constructor(ahcievementsService: AchievementsService) {}

  @Get()
  getAchievements() {}
}
