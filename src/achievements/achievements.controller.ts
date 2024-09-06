import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AchievementsService } from "./achievements.service";
import { ApiTags } from "@nestjs/swagger";
import { GetAchievementsDto } from "./dtos/get-achievements.dto";
import { ApiGetAchievements } from "./achievements-swagger/get-achievements.decorator";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";

@Controller("achievements")
@ApiTags("Achievements")
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  @ApiGetAchievements()
  @UseGuards(AccessTokenAuthGuard)
  getAchievements(@Query() query: GetAchievementsDto) {
    return this.achievementsService.getAchievements(query);
  }
}
