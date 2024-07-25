import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { CharactersService } from "./characters.service";
import { ApiTags } from "@nestjs/swagger";
import { GetCharactersDto } from "./dtos/get-characters.dto";
import { ApiGetCharacters } from "./characters-swagger/get-characters.decorator";
import { ApiGetOneCharacter } from "./characters-swagger/get-one-character.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";

@Controller("characters")
@ApiTags("Characters")
export class CharactersController {
  constructor(private readonly charactersServcie: CharactersService) {}

  @Get()
  @ApiGetCharacters()
  @UseGuards(AccessTokenAuthGuard)
  getCharacters(@Query() query: GetCharactersDto) {
    return this.charactersServcie.getCharacters(query);
  }

  @Get(":characterNo")
  @ApiGetOneCharacter()
  @UseGuards(AccessTokenAuthGuard)
  getOneCharacter(
    @Param("characterNo", ParsePositiveIntPipe) characterNo: number,
  ) {
    return this.charactersServcie.getOneCharacter(characterNo);
  }
}
