import { Module } from "@nestjs/common";
import { CharacterLockersRepository } from "./characterLockers.repository";
import { CharacterLockersController } from "./characterLockers.controller";
import { CharacterLockersService } from "./characterLockers.service";
import { CharactersModule } from "src/characters/characters.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [CharactersModule, UsersModule],
  controllers: [CharacterLockersController],
  providers: [CharacterLockersRepository, CharacterLockersService],
  exports: [CharacterLockersRepository],
})
export class CharacterLockerModule {}
