import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CharacterLockersService } from "./characterLockers.service";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { GetUserCharactersDto } from "./dtos/get-user-characters.dto";
import { CharacterNoDto } from "./dtos/character-no.dto";
import { ApiGetUserCharacters } from "./characterLockers-swagger/get-user-characters.decorator";

@Controller()
@ApiTags("CharacterLockers")
export class CharacterLockersController {
  constructor(
    private readonly characterLockerService: CharacterLockersService,
  ) {}

  @Get("users/:userNo/characters")
  @ApiGetUserCharacters()
  getUserCharacters(
    @Param("userNo", ParseIntPipe) userNo: number,
    @Query() query: GetUserCharactersDto,
  ) {
    return this.characterLockerService.getUserAllCharacters(userNo, query);
  }

  @Post("users/characters")
  @ApiOperation({
    summary: "캐릭터 구매 API",
    description: "캐릭터를 구매하여 characterLocker테이블에 등록합니다.",
  })
  createOneUserCharacter(@Body() body: CharacterNoDto) {
    const userNo = 1;

    return this.characterLockerService.createOneUserCharacter(userNo, body);
  }

  @Patch("users/characters")
  @ApiOperation({
    summary: "캐릭터 사용 API",
    description:
      "캐릭터를 사용합니다. 이전에 사용했던 캐릭터는 사용해제됩니다.",
  })
  updateCharacterStatus(@Body() body: CharacterNoDto) {
    const userNo = 1;

    return this.characterLockerService.updateCharacterStatus(userNo, body);
  }
}
