import { Module } from "@nestjs/common";
import { LikesController } from "./likes.controller";
import { LikesService } from "./likes.service";
import { LikesRepository } from "./likes.repository";
import { UsersModule } from "src/users/users.module";
import { LegendsModule } from "src/legends/legends.module";

@Module({
  imports: [UsersModule, LegendsModule],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository],
})
export class LikesModule {}
