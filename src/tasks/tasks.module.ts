import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { UsersModule } from "src/users/users.module";
import { SseModule } from "src/sse/sse.module";

@Module({
  imports: [UsersModule, SseModule],
  providers: [TasksService],
})
export class TasksModule {}
