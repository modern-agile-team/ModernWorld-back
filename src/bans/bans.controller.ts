import { Body, Controller, Post } from "@nestjs/common";
import { BansService } from "./bans.service";
import { CreateBanDto } from "./dtos/create-ban.dto";

@Controller("bans")
export class BansController {
  constructor(private readonly bansService: BansService) {}

  @Post()
  createBan(@Body("content") body: CreateBanDto) {
    return this.bansService.createBan(body);
  }
}
