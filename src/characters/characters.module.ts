import { Module } from "@nestjs/common";
import { CharactersController } from "./characters.controller";
import { CharactersService } from "./characters.service";
import { CharactersRepository } from "./characters.repository";
import { UsersModule } from "src/users/users.module";
import { CharacterLockerModule } from "src/characterLocker/characterLocker.module";

@Module({
  imports: [UsersModule, CharacterLockerModule],
  controllers: [CharactersController],
  providers: [CharactersService, CharactersRepository],
})
export class CharactersModule {}
