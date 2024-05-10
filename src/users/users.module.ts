import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepository as UsersRepository } from "./users.repository";
import { InventoryModule } from "src/inventory/inventory.module";
import { CharacterLockerModule } from "src/character-locker/character-locker.module";
import { PresentsModule } from "src/users/presents/presents.module";

@Module({
  imports: [InventoryModule, CharacterLockerModule, PresentsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
