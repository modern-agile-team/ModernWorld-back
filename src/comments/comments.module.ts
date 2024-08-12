import { Module } from "@nestjs/common";
import { CommentService } from "./comments.service";
import { CommentController } from "./comments.controller";
import { CommentRepository } from "./comments.repository";
import { UsersModule } from "src/users/users.module";
import { LegendsModule } from "src/legends/legends.module";
import { SseModule } from "src/sse/sse.module";
import { AlarmsModule } from "src/alarms/alarms.module";
import { UserAchievementsModule } from "src/user-achievements/user-achievements.module";

@Module({
  imports: [
    UsersModule,
    LegendsModule,
    SseModule,
    AlarmsModule,
    UserAchievementsModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
