import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { PostsRepository } from "./posts.repositroy";
import { UsersModule } from "src/users/users.module";
import { AlarmsModule } from "src/alarms/alarms.module";

@Module({
  imports: [UsersModule, AlarmsModule],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
