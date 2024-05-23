import { Module } from "@nestjs/common";
import { CharacterLockerRepository } from "./characterLocker.repository";
import { CharacterLockerController } from "./characterLocker.controller";
import { CharacterLockerService } from "./characterLocker.service";
import { CharactersModule } from "src/characters/characters.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [CharactersModule, UsersModule],
  controllers: [CharacterLockerController],
  providers: [CharacterLockerRepository, CharacterLockerService],
  exports: [CharacterLockerRepository],
})
export class CharacterLockerModule {}
