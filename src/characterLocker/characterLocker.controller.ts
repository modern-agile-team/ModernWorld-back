import { Controller, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CharacterLockerService } from "./characterLocker.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("characterLocker")
@ApiTags("CharacterLocker")
export class CharacterLockerController {
  constructor(
    private readonly characterLockerService: CharacterLockerService,
  ) {}
  @Post(":characterNo")
  @ApiOperation({
    summary: "캐릭터 구매 API",
    description: "캐릭터를 구매하여 characterLocker테이블에 등록합니다.",
  })
  createCharacter(@Param("characterNo", ParseIntPipe) characterNo: number) {
    const userNo = 1;

    return this.characterLockerService.buyOneCharacter(userNo, characterNo);
  }

  @Patch(":characterNo")
  @ApiOperation({
    summary: "캐릭터 사용 API",
    description:
      "캐릭터를 사용합니다. 이전에 사용했던 캐릭터는 사용해제됩니다.",
  })
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
