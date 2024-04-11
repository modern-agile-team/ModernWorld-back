import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(":no")
  getOneUserWithNameAndPointAndAchievementTitle(
    @Param("no", ParseIntPipe) no: number,
  ) {
    return this.userService.getUserNameAndCurrentPointAndAccumulatinPointAndTitle(
      no,
    );
  }

  @Post()
  createUser(
    @Body("desciption") description: string,
    @Body("nickname") nickname: string,
    @Body("status", ParseBoolPipe) status: boolean,
    @Body("uniqueIdentifier") uniqueIdentifier: string,
  ) {
    const attendance = {};

    return this.userService.createUser({
      description,
      nickname,
      status,
      attendance,
      uniqueIdentifier,
    });
  }

  @Put(":no")
  updateUser(
    @Param("no", ParseIntPipe) no: number,
    @Body("description") description: string,
  ) {
    return this.userService.updateUser({ no, description });
  }
}
