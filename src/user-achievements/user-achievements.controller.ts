import { Controller, Get } from "@nestjs/common";
import { UserAchievementsService } from "./user-achievements.service";
import { ApiTags } from "@nestjs/swagger";

@Controller("user-achievements")
@ApiTags("UserAchievements")
export class UserAchievementsController {
  constructor(
    private readonly userAchievementsService: UserAchievementsService,
  ) {}

  @Get("")
  getUserAchievements() {
    const userNo = 1;

    return this.userAchievementsService.getUserAchievements();
  }
}
