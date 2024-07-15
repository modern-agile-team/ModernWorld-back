import { Controller, Get, Param, Query } from "@nestjs/common";
import { CharactersService } from "./characters.service";
import { ApiTags } from "@nestjs/swagger";
import { GetCharactersDto } from "./dtos/get-characters.dto";
import { ApiGetCharacters } from "./characters-swagger/get-characters.decorator";
import { ApiGetOneCharacter } from "./characters-swagger/get-one-character.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";

@Controller("characters")
@ApiTags("Characters")
export class CharactersController {
  constructor(private readonly charactersServcie: CharactersService) {}

  @Get()
  @ApiGetCharacters()
  getCharacters(@Query() query: GetCharactersDto) {
    return this.charactersServcie.getCharacters(query);
  }

  @Get(":characterNo")
  @ApiGetOneCharacter()
  getOneCharacter(
    @Param("characterNo", ParsePositiveIntPipe) characterNo: number,
  ) {
    return this.charactersServcie.getOneCharacter(characterNo);
  }
}
