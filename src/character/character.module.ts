import { Module } from "@nestjs/common";
import { CharacterController } from "./character.controller";
import { CharacterService } from "./character.service";
import { CharacterRepository } from "./character.repository";

@Module({
  controllers: [CharacterController],
  providers: [CharacterService, CharacterRepository],
})
export class CharacterModule {}
