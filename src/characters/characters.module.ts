import { Module } from "@nestjs/common";
import { CharactersController } from "./characters.controller";
import { CharactersService } from "./characters.service";
import { CharactersRepository } from "./characters.repository";

@Module({
  controllers: [CharactersController],
  providers: [CharactersService, CharactersRepository],
  exports: [CharactersRepository],
})
export class CharactersModule {}
