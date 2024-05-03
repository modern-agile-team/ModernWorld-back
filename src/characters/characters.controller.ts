import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CharactersService } from "./characters.service";

@Controller("characters")
export class CharactersController {
  constructor(private readonly charactersServcie: CharactersService) {}

  @Get("")
  getAllCharactersBySpeices(@Query("species") species: string) {
    //요놈 type, User에서 만든 animal enum 나중에 써라
    return this.charactersServcie.getCharactersBySpeices(species);
  }

  @Post(":characterNo")
  createCharacter(@Param("characterNo", ParseIntPipe) characterNo: number) {
    const userNo = 1;

    return this.charactersServcie.buyOneCharacter(userNo, characterNo);
  }

  @Patch("characterNo")
  updateCharacterStatus(
    @Param("characterNo", ParseIntPipe) characterNo: number,
  ) {}
}
