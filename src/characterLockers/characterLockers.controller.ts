import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CharacterLockersService } from "./characterLockers.service";
import { ApiTags } from "@nestjs/swagger";
import { GetUserCharactersDto } from "./dtos/get-user-characters.dto";
import { CharacterNoDto } from "./dtos/character-no.dto";
import { ApiGetUserCharacters } from "./characterLockers-swagger/get-user-characters.decorator";
import { ApiCreateUserOneCharacter } from "./characterLockers-swagger/create-user-character.decorator";
import { ApiUpdateUserCharacter } from "./characterLockers-swagger/update-user-character.decorator";

@Controller()
@ApiTags("CharacterLockers")
export class CharacterLockersController {
  constructor(
    private readonly characterLockerService: CharacterLockersService,
  ) {}

  @Get("users/:userNo/characters")
  @ApiGetUserCharacters()
  getUserCharacters(
    @Param("userNo", ParseIntPipe) userNo: number,
    @Query() query: GetUserCharactersDto,
  ) {
    return this.characterLockerService.getUserAllCharacters(userNo, query);
  }

  @Post("users/my/characters")
  @ApiCreateUserOneCharacter()
  createUserOneCharacter(@Body() body: CharacterNoDto) {
    const userNo = 1;

    return this.characterLockerService.createUserOneCharacter(userNo, body);
  }

  @Put("users/my/characters/:characterNo/status")
  @ApiUpdateUserCharacter()
  updateCharacterStatus(@Param() param: CharacterNoDto) {
    const userNo = 1;

    return this.characterLockerService.updateCharacterStatus(userNo, param);
  }
}
