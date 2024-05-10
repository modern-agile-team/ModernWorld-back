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
import { ApiOperation, ApiTags } from "@nestjs/swagger";

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
    @Query("species", new ParseEnumPipe(Animal, { optional: true }))
    species?: Animal,
  ) {
    //요놈 type, User에서 만든 animal enum 나중에 써라

    return this.charactersServcie.getCharactersBySpeices(species);
  }

  @Get(":characterNo")
  @ApiOperation({
    summary: "캐릭터 사용 API",
    description:
      "캐릭터를 사용합니다. 이전에 사용했던 캐릭터는 사용해제됩니다.",
  })
  getOneCharacter(@Param("characterNo", ParseIntPipe) characterNo: number) {
    return this.charactersServcie.getOneCharacter(characterNo);
  }
}
