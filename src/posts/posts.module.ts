import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { PostsRepository } from "./posts.repositroy";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
