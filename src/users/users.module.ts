import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";
import { LegendsModule } from "src/legends/legends.module";
import { UserAchievementsModule } from "src/user-achievements/user-achievements.module";

@Module({
  imports: [LegendsModule, forwardRef(() => UserAchievementsModule)],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
