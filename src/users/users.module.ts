import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserRepository } from "./users.repository";
import { UsersInventoryRepository } from "./user.inventory.repository";
@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UsersInventoryRepository],
})
export class UsersModule {}
