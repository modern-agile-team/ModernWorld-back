import { Module } from "@nestjs/common";
import { CommentService } from "./comments.service";
import { CommentController } from "./comments.controller";
import { CommentRepository } from "./comments.repository";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
