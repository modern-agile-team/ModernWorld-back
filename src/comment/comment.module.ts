import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { CommentRepository } from "./comment.repository";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
