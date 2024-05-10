import { Controller, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CharacterLockerService } from "./characterLocker.service";
import { ApiTags } from "@nestjs/swagger";

@Controller("characterLocker")
@ApiTags("CharacterLocker")
export class CharacterLockerController {
  constructor(
    private readonly characterLockerService: CharacterLockerService,
  ) {}
  @Post(":characterNo")
  createCharacter(@Param("characterNo", ParseIntPipe) characterNo: number) {
    const userNo = 1;

    return this.characterLockerService.buyOneCharacter(userNo, characterNo);
  }

  @Patch(":characterNo")
  updateCharacterStatus(
    @Param("characterNo", ParseIntPipe) characterNo: number,
  ) {
    const userNo = 1;

    return this.characterLockerService.useCharacterDisuseOthers(
      userNo,
      characterNo,
    );
  }
}
