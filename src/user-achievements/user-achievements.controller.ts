import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { UserAchievementsService } from "./user-achievements.service";
import { ApiTags } from "@nestjs/swagger";
import { updateUserAchievementStatusDto } from "./dtos/update-user-achievement-status.dto";
import { ApiUpdateUserAchievementStatus } from "./userAchievements-swagger/update-user-achievement-status.decorator";
import { ApiGetUserAchievements } from "./userAchievements-swagger/get-user-achievements.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { UserNo } from "src/auth/auth.decorator";

@Controller("users/my/achievements")
@ApiTags("UserAchievements")
export class UserAchievementsController {
  constructor(
    private readonly userAchievementsService: UserAchievementsService,
  ) {}

  @Get()
  @ApiGetUserAchievements()
  @UseGuards(AccessTokenAuthGuard)
  getUserAchievements(@UserNo() userNo: number) {
    return this.userAchievementsService.getUserAchievements(userNo);
  }

  @Patch(":achievementNo")
  @ApiUpdateUserAchievementStatus()
  @UseGuards(AccessTokenAuthGuard)
  updateUserAchievementStatus(
    @UserNo() userNo: number,
    @Param("achievementNo", ParsePositiveIntPipe) achievementNo: number,
    @Body()
    body: updateUserAchievementStatusDto,
  ) {
    return this.userAchievementsService.updateUserAchievementStatus(
      userNo,
      achievementNo,
      body,
    );
  }
}
