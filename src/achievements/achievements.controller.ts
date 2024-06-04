import { Controller, Get } from "@nestjs/common";
import { AchievementsService } from "./achievements.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("achievements")
@ApiTags("Achievements")
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  @ApiOperation({
    summary: "업적 조회",
  })
  getAchievements() {
    return this.achievementsService.getAchievements();
  }
}
