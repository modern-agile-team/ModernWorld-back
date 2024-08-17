import { Module } from "@nestjs/common";
import { BansController } from "./bans.controller";
import { BansService } from "./bans.service";
import { BansRepository } from "./bans.repository";
import { UsersModule } from "src/users/users.module";
import { RedisModule } from "src/auth/redis/redis.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [UsersModule, RedisModule, AuthModule],
  controllers: [BansController],
  providers: [BansService, BansRepository],
})
export class BansModule {}
