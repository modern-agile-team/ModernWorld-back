import { Module } from "@nestjs/common";
import { CharactersController } from "./characters.controller";
import { CharactersService } from "./characters.service";
import { CharactersRepository } from "./characters.repository";
import { CharacterLockerRepository } from "./charactersLocker.repository";

@Module({
  controllers: [CharactersController],
  providers: [
    CharactersService,
    CharactersRepository,
    CharacterLockerRepository,
  ],
})
export class CharactersModule {}
