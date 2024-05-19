import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { CharactersService } from "./characters.service";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { GetCharactersDto } from "./dtos/get-charactes.dto";

@Controller("characters")
@ApiTags("Characters")
export class CharactersController {
  constructor(private readonly charactersServcie: CharactersService) {}

  @Get()
  @ApiOperation({
    summary: "모든 캐릭터 불러오기 API",
    description: "캐릭터를 불러옵니다. species는 cat, dog",
  })
  getCharactersBySpeices(
    @Query()
    queryParams: GetCharactersDto,
  ) {
    return this.charactersServcie.getCharactersBySpeices(queryParams);
  }

  @Get(":characterNo")
  @ApiOperation({
    summary: "특정 캐릭터 불러오기 API",
    description: "특정 캐릭터를 불러옵니다.",
  })
  @ApiParam({
    name: "characterNo",
    type: Number,
    required: true,
    example: 1,
  })
  getOneCharacter(@Param("characterNo", ParseIntPipe) characterNo: number) {
    return this.charactersServcie.getOneCharacter(characterNo);
  }
}
