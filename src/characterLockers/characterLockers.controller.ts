import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CharacterLockersService } from "./characterLockers.service";
import { ApiTags } from "@nestjs/swagger";
import { GetUserCharactersDto } from "./dtos/get-user-characters.dto";
import { CharacterNoDto } from "./dtos/character-no.dto";
import { ApiGetUserCharacters } from "./characterLockers-swagger/get-user-characters.decorator";
import { ApiCreateUserOneCharacter } from "./characterLockers-swagger/create-user-character.decorator";
import { ApiUpdateUserCharacter } from "./characterLockers-swagger/update-user-character.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { userNo } from "src/auth/auth.decorator";

@Controller()
@ApiTags("CharacterLockers")
export class CharacterLockersController {
  constructor(
    private readonly characterLockerService: CharacterLockersService,
  ) {}

  @Get("users/:userNo/characters")
  @ApiGetUserCharacters()
  @UseGuards(AccessTokenAuthGuard)
  getUserCharacters(
    @Param("userNo", ParsePositiveIntPipe) userNo: number,
    @Query() query: GetUserCharactersDto,
  ) {
    return this.characterLockerService.getUserAllCharacters(userNo, query);
  }

  @Post("users/my/characters")
  @ApiCreateUserOneCharacter()
  @UseGuards(AccessTokenAuthGuard)
  createUserOneCharacter(
    @userNo() userNo: number,
    @Body() body: CharacterNoDto,
  ) {
    return this.characterLockerService.createUserOneCharacter(userNo, body);
  }

  @Patch("users/my/characters/:characterNo")
  @ApiUpdateUserCharacter()
  @UseGuards(AccessTokenAuthGuard)
  updateCharacterStatus(
    @userNo() userNo: number,
    @Param("characterNo", ParsePositiveIntPipe) characterNo: number,
  ) {
    return this.characterLockerService.updateCharacterStatus(
      userNo,
      characterNo,
    );
  }
}
