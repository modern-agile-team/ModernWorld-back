import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
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
}
