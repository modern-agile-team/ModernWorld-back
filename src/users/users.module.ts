import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";
import { CommonModule } from "src/common/common.module";
import { LegendsModule } from "src/legends/legends.module";

@Module({
  imports: [forwardRef(() => CommonModule), LegendsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
