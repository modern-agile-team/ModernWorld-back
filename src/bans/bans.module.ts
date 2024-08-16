import { Module } from "@nestjs/common";
import { BansController } from "./bans.controller";
import { BansService } from "./bans.service";
import { BansRepository } from "./bans.repository";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [BansController],
  providers: [BansService, BansRepository],
})
export class BansModule {}
