import {
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CharactersService } from "./characters.service";
import { Animal } from "src/common/enum/animal-enum";

@Controller("characters")
export class CharactersController {
  constructor(private readonly charactersServcie: CharactersService) {}

  @Get()
  getCharactersBySpeices(
    @Query("species", new ParseEnumPipe(Animal)) species?: Animal,
  ) {
    //요놈 type, User에서 만든 animal enum 나중에 써라

    return this.charactersServcie.getCharactersBySpeices(species);
  }

  @Get(":characterNo")
  getOneCharacter(@Param("characterNo", ParseIntPipe) characterNo: number) {
    return this.charactersServcie.getOneCharacter(characterNo);
  }

  @Post(":characterNo")
  createCharacter(@Param("characterNo", ParseIntPipe) characterNo: number) {
    const userNo = 1;

    return this.charactersServcie.buyOneCharacter(userNo, characterNo);
  }

  @Patch(":characterNo")
  updateCharacterStatus(
    @Param("characterNo", ParseIntPipe) characterNo: number,
  ) {
    const userNo = 1;

    return this.charactersServcie.useCharacterDisuseOthers(userNo, characterNo);
  }
}
