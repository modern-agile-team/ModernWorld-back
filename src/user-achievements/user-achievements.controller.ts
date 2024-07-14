import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from "@nestjs/common";
import { UserAchievementsService } from "./user-achievements.service";
import { ApiTags } from "@nestjs/swagger";
import { updateUserAchievementStatusDto } from "./dtos/update-user-achievement-status.dto";
import { ApiUpdateUserAchievementStatus } from "./userAchievements-swagger/update-user-achievement-status.decorator";
import { ApiGetUserAchievements } from "./userAchievements-swagger/get-user-achievements.decorator";

@Controller("users/my/achievements")
@ApiTags("UserAchievements")
export class UserAchievementsController {
  constructor(
    private readonly userAchievementsService: UserAchievementsService,
  ) {}

  @Get()
  @ApiGetUserAchievements()
  getUserAchievements() {
    const userNo = 1;

    return this.userAchievementsService.getUserAchievements(userNo);
  }

  @Patch(":achievementNo")
  @ApiUpdateUserAchievementStatus()
  updateUserAchievementStatus(
    @Param("achievementNo", ParseIntPipe) achievementNo: number,
    @Body()
    body: updateUserAchievementStatusDto,
  ) {
    const userNo = 1;

    return this.userAchievementsService.updateUserAchievementStatus(
      userNo,
      achievementNo,
      body,
    );
  }
}
