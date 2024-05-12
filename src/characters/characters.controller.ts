import {
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { CharactersService } from "./characters.service";
import { Animal } from "src/common/enum/animal-enum";
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  PickType,
} from "@nestjs/swagger";

@Controller("characters")
@ApiTags("Characters")
export class CharactersController {
  constructor(private readonly charactersServcie: CharactersService) {}

  @Get()
  @ApiOperation({
    summary: "모든 캐릭터 불러오기 API",
    description: "캐릭터를 불러옵니다. species는 cat, dog",
  })
  @ApiQuery({
    name: "species",
    enum: Animal,
    required: false,
    example: "cat",
  })
  getCharactersBySpeices(
    @Query("species", new ParseEnumPipe(Animal, { optional: true }))
    species?: Animal,
  ) {
    //요놈 type, User에서 만든 animal enum 나중에 써라

    return this.charactersServcie.getCharactersBySpeices(species);
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
