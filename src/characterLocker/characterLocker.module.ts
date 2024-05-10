import { Module } from "@nestjs/common";
import { CharacterLockerRepository } from "./characterLocker.repository";
import { CharacterLockerController } from "./characterLocker.controller";
import { CharacterLockerService } from "./characterLocker.service";

@Module({
  controllers: [CharacterLockerController],
  providers: [CharacterLockerRepository, CharacterLockerService],
  exports: [CharacterLockerRepository],
})
export class CharacterLockerModule {}
