import { Body, Controller, Post } from "@nestjs/common";
import { BansService } from "./bans.service";
import { CreateBanDto } from "./dtos/create-ban.dto";
import { ApiCreateBan } from "./bans-swagger/create-ban.decorator";

@Controller("bans")
export class BansController {
  constructor(private readonly bansService: BansService) {}

  @Post()
  @ApiCreateBan()
  createBan(@Body() body: CreateBanDto) {
    return this.bansService.createBan(body);
  }
}
