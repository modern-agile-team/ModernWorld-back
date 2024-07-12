import { Controller, Get } from "@nestjs/common";
import { LegendsService } from "./legends.service";
import { ApiTags } from "@nestjs/swagger";

@Controller("legends")
@ApiTags("Legends")
export class LegendsController {
  constructor(private readonly legendsService: LegendsService) {}

  @Get()
  getUserAchievementLegneds() {
    const userNo = 1;

    return this.legendsService.getAllLendsByUserNo(userNo);
  }
}