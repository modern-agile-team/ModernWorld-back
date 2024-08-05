import { Module } from "@nestjs/common";
import { GamesController } from "./games.controller";
import { RockScissorsPaperService } from "./rock-scissors-paper/rock-scissors-paper.service";
import { LegendsModule } from "src/legends/legends.module";
import { UsersModule } from "src/users/users.module";
import { CommonModule } from "src/common/common.module";
import { AlarmsModule } from "src/alarms/alarms.module";
import { SseModule } from "src/sse/sse.module";
import { RockScissorsPaperRepository } from "./rock-scissors-paper/rock-scissors-paper.repository";

@Module({
  imports: [LegendsModule, UsersModule, CommonModule, AlarmsModule, SseModule],
  controllers: [GamesController],
  providers: [RockScissorsPaperService, RockScissorsPaperRepository],
})
export class GamesModule {}
