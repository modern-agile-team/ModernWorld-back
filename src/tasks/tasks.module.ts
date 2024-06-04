import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [UsersModule],
  providers: [TasksService],
})
export class TasksModule {}
