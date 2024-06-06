import { Body, Controller, Get, Patch } from "@nestjs/common";
import { UserAchievementsService } from "./user-achievements.service";
import { ApiTags } from "@nestjs/swagger";
import { updateUserAchievementStatusDto } from "./dtos/update-user-achievement-status.dto";

@Controller("user-achievements")
@ApiTags("UserAchievements")
export class UserAchievementsController {
  constructor(
    private readonly userAchievementsService: UserAchievementsService,
  ) {}

  @Get()
  getUserAchievements() {
    const userNo = 1;

    return this.userAchievementsService.getUserAchievements(userNo);
  }

  @Patch()
  updateUserAchievementStatus(@Body() body: updateUserAchievementStatusDto) {
    const userNo = 1;

    return this.userAchievementsService.updateUserAchievementStatus(
      userNo,
      body,
    );
  }
}
