import { Module } from "@nestjs/common";
import { CommentService } from "./comments.service";
import { CommentController } from "./comments.controller";
import { CommentRepository } from "./comments.repository";
import { UsersModule } from "src/users/users.module";
import { CommonModule } from "src/common/common.module";
import { LegendsModule } from "src/legends/legends.module";
import { SseModule } from "src/sse/sse.module";
import { AlarmsModule } from "src/alarms/alarms.module";

@Module({
  imports: [UsersModule, CommonModule, LegendsModule, SseModule, AlarmsModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
