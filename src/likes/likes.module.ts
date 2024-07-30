import { Module } from "@nestjs/common";
import { LikesController } from "./likes.controller";
import { LikesService } from "./likes.service";
import { LikesRepository } from "./likes.repository";
import { UsersModule } from "src/users/users.module";
import { LegendsModule } from "src/legends/legends.module";
import { CommonModule } from "src/common/common.module";
import { AlarmsModule } from "src/alarms/alarms.module";
import { SseModule } from "src/sse/sse.module";

@Module({
  imports: [UsersModule, LegendsModule, CommonModule, AlarmsModule, SseModule],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository],
})
export class LikesModule {}
