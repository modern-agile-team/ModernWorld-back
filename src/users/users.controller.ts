import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Patch,
  Put,
  Post,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { GetUsersByAnimalDto } from "./dtos/get-users-by-animal.dto";
import { ApiTags } from "@nestjs/swagger";
import { UpdateUserNicknameDto } from "./dtos/update-user-nickname.dto";
import { UpdateUserDescriptionDto } from "./dtos/update-user-description.dto";
import { ApiGetUserAttendance } from "./users-swagger/get-user-attendance.decorator";
import { ApiUpdateUserAttendance } from "./users-swagger/update-user-attendance.decorator";
import { ApiGetUsers } from "./users-swagger/get-users.decorator";
import { ApiGetUserNamePointAchievementTitle } from "./users-swagger/get-user-name-point-achievement.decorator";
import { ApiCreateUserNickname } from "./users-swagger/create-user-nickname.decorator";
import { ApiUpdateUserDescription } from "./users-swagger/update-user-description.decorator";

@Controller("users")
@ApiTags("Users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/attendance")
  @ApiGetUserAttendance()
  getOneUserAttendance() {
    const userNo = 1;

    return this.usersService.getUserAttendance(userNo);
  }

  @Get()
  @ApiGetUsers()
  getUsers(@Query() query: GetUsersByAnimalDto) {
    return this.usersService.getUsers(query);
  }

  @Get("/:userNo")
  @ApiGetUserNamePointAchievementTitle()
  getUserNamePointAchievementTitle(
    @Param("userNo", ParseIntPipe) userNo: number,
  ) {
    return this.usersService.getUserNamePointTitleCharacter(userNo);
  }

  @Patch("/attendance")
  @ApiUpdateUserAttendance()
  updateUserAttendance() {
    const userNo = 1;

    return this.usersService.updateUserAttendance(userNo);
  }

  @Post("/nickname")
  @ApiCreateUserNickname()
  createUserNickname(@Body() body: UpdateUserNicknameDto) {
    const userNo = 1;

    return this.usersService.createUserNickname(userNo, body);
  }

  @Put("/description")
  @ApiUpdateUserDescription()
  updateUserDescription(@Body() body: UpdateUserDescriptionDto) {
    const userNo = 1;

    return this.usersService.updateUserDescription(userNo, body);
  }
}
