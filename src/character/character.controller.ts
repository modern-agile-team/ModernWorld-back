import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CharacterService } from "./character.service";

@Controller("character")
export class CharacterController {
  constructor(private readonly characterServcie: CharacterService) {}

  @Get("")
  getAllCharactersBySpeices(@Query("species") species: string) {
    //요놈 type, User에서 만든 animal enum 나중에 써라
  }

  @Post(":characterNo")
  createCharacter(@Param("characterNo", ParseIntPipe) characterNo: number) {}

  @Patch("characterNo")
  updateCharacterStatus(
    @Param("characterNo", ParseIntPipe) characterNo: number,
  ) {}
}
