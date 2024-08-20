import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { BansService } from "./bans.service";
import { CreateBanDto } from "./dtos/create-ban.dto";
import { ApiCreateBan } from "./bans-swagger/create-ban.decorator";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { UserNo } from "src/auth/auth.decorator";
import { ApiTags } from "@nestjs/swagger";

@Controller("bans")
@ApiTags("Bans")
export class BansController {
  constructor(private readonly bansService: BansService) {}

  @Post()
  @UseGuards(AccessTokenAuthGuard)
  @ApiCreateBan()
  createBan(@UserNo() adminNo: number, @Body() body: CreateBanDto) {
    return this.bansService.createBan(adminNo, body);
  }
}
