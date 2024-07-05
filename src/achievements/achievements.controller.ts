import { Controller, Get, Query } from "@nestjs/common";
import { AchievementsService } from "./achievements.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetAchievementsDto } from "./dtos/get-achievements.dto";

@Controller("achievements")
@ApiTags("Achievements")
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  @ApiOperation({
    summary: "모든 업적 조회",
  })
  getAchievements(@Query() queryParams: GetAchievementsDto) {
    return this.achievementsService.getAchievements(queryParams);
  }
}
