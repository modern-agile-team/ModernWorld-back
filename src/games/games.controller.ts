import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UserNo } from "src/auth/auth.decorator";
import { RockScissorsPaperService } from "./rock-scissors-paper/rock-scissors-paper.service";
import { RockScissorsPaperDto } from "./rock-scissors-paper/dtos/rock-scissors-paper.dto";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { ApiRockScissorsPaper } from "./swagger-decorators/rock-scissors-paper.decorator";
import { ApiTags } from "@nestjs/swagger";

@Controller("games")
@ApiTags("Games")
export class GamesController {
  constructor(
    private readonly rockScissorsPaperService: RockScissorsPaperService,
  ) {}

  @Post("rock-scissors-paper")
  @UseGuards(AccessTokenAuthGuard)
  @ApiRockScissorsPaper()
  rockScissorsPaper(
    @UserNo() userNo: number,
    @Body() body: RockScissorsPaperDto,
  ) {
    return this.rockScissorsPaperService.rockScissorsPaper(userNo, body);
  }
}
