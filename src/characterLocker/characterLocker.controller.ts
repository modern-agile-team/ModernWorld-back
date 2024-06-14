import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CharacterLockerService } from "./characterLocker.service";
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Animal } from "src/common/enum/animal.enum";

@Controller("character-locker")
@ApiTags("CharacterLocker")
export class CharacterLockerController {
  constructor(
    private readonly characterLockerService: CharacterLockerService,
  ) {}

  @Get("users/:userNo")
  @ApiOperation({
    summary: "유저 캐릭터 조회 API",
    description: "유저가 가지고 있는 캐릭터를 조회합니다.",
  })
  @ApiParam({
    name: "userNo",
    example: 1,
  })
  @ApiQuery({
    name: "species",
    enum: Animal,
    required: false,
    example: "cat",
  })
  @ApiQuery({
    name: "status",
    required: false,
  })
  getUserCharacters(
    @Param("userNo", ParseIntPipe) userNo: number,
    @Query("species", new ParseEnumPipe(Animal, { optional: true }))
    species?: Animal,
    @Query("status", new ParseBoolPipe({ optional: true })) status?: boolean,
  ) {
    return this.characterLockerService.getUserAllCharacters(
      userNo,
      species,
      status,
    );
  }

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

    return this.characterLockerService.updateCharacterStatus(
      userNo,
      characterNo,
    );
  }
}
