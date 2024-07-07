import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { CharactersService } from "./characters.service";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { GetCharactersDto } from "./dtos/get-characters.dto";
import { ApiGetCharacters } from "./characters-swagger/get-characters.decorator";
import { ApiGetOneCharacter } from "./characters-swagger/get-one-character.decorator.decorator";

@Controller("characters")
@ApiTags("Characters")
export class CharactersController {
  constructor(private readonly charactersServcie: CharactersService) {}

  @Get()
  @ApiGetCharacters()
  getCharacters(
    @Query()
    queryParams: GetCharactersDto,
  ) {
    return this.charactersServcie.getCharacters(queryParams);
  }

  @Get(":characterNo")
  @ApiGetOneCharacter()
  getOneCharacter(@Param("characterNo", ParseIntPipe) characterNo: number) {
    return this.charactersServcie.getOneCharacter(characterNo);
  }
}
