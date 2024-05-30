import { Module } from "@nestjs/common";
import { LikesController } from "./likes.controller";
import { LikesService } from "./likes.service";
import { LikesRepository } from "./likes.repository";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository],
})
export class LikesModule {}
