import { Controller, Get } from "@nestjs/common";

@Controller("achievements")
export class AchievementsController {
  @Get()
  getAchievements() {}
}
