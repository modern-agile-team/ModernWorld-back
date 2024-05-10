import { Module } from "@nestjs/common";
import { CharacterLockerRepository } from "./characterLocker.repository";

@Module({
  providers: [CharacterLockerRepository],
  exports: [CharacterLockerRepository],
})
export class CharacterLockerModule {}
