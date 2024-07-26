import { Controller, Get, UseGuards } from "@nestjs/common";
import { LegendsService } from "./legends.service";
import { ApiTags } from "@nestjs/swagger";
import { ApiGetUserLegends } from "./legends-swagger/get-user-legends.decorator";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { UserNo } from "src/auth/auth.decorator";

@Controller("users/my/legends")
@ApiTags("Legends")
export class LegendsController {
  constructor(private readonly legendsService: LegendsService) {}

  @Get()
  @ApiGetUserLegends()
  @UseGuards(AccessTokenAuthGuard)
  getUserAchievementLegneds(@UserNo() userNo: number) {
    return this.legendsService.getAllLendsByUserNo(userNo);
  }
}
