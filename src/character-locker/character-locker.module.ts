import { Module } from "@nestjs/common";
import { CharacterLockerRepository } from "./charactersLocker.repository";

@Module({
  providers: [CharacterLockerRepository],
  exports: [CharacterLockerRepository],
})
export class CharacterLockerModule {}
