import { Controller, Get } from "@nestjs/common";
import { LegendsService } from "./legends.service";
import { ApiTags } from "@nestjs/swagger";
import { ApiGetUserLegends } from "./legends-swagger/get-user-legends.decorator";

@Controller("users/my/legends")
@ApiTags("Legends")
export class LegendsController {
  constructor(private readonly legendsService: LegendsService) {}

  @Get()
  @ApiGetUserLegends()
  getUserAchievementLegneds() {
    const userNo = 1;

    return this.legendsService.getAllLendsByUserNo(userNo);
  }
}
