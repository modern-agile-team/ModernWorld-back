import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserNo } from "src/auth/auth.decorator";
import { RockScissorsPaperService } from "./rock-scissors-paper/rock-scissors-paper.service";
import { RockScissorsPaperDto } from "./rock-scissors-paper/dtos/rock-scissors-paper.dto";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { ApiCreateRSPRecord } from "./swagger-decorators/create-RSP-record.decorator";
import { ApiTags } from "@nestjs/swagger";

@Controller("users/my")
@ApiTags("Games")
export class GamesController {
  constructor(
    private readonly rockScissorsPaperService: RockScissorsPaperService,
  ) {}

  @Post("rock-scissors-paper")
  @UseGuards(AccessTokenAuthGuard)
  @ApiCreateRSPRecord()
  createRSPRecord(
    @UserNo() userNo: number,
    @Body() body: RockScissorsPaperDto,
  ) {
    return this.rockScissorsPaperService.createRSPRecord(userNo, body);
  }

  // @Get("rock-scissors-paper")
  // @UseGuards(AccessTokenAuthGuard)
  // getRSPRecord(@UserNo() userNo: number) {
  //   return this.rockScissorsPaperService;
  // }
}
