import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Put,
  Post,
  UseGuards,
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
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { UserNo } from "src/auth/auth.decorator";

@Controller("users")
@ApiTags("Users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("my/attendance")
  @ApiGetUserAttendance()
  @UseGuards(AccessTokenAuthGuard)
  getOneUserAttendance(@UserNo() userNo: number) {
    return this.usersService.getUserAttendance(userNo);
  }

  @Get()
  @ApiGetUsers()
  @UseGuards(AccessTokenAuthGuard)
  getUsers(@Query() query: GetUsersByAnimalDto) {
    return this.usersService.getUsers(query);
  }

  @Get(":userNo")
  @ApiGetUserNamePointAchievementTitle()
  @UseGuards(AccessTokenAuthGuard)
  getUserNamePointAchievementTitle(
    @Param("userNo", ParsePositiveIntPipe) userNo: number,
  ) {
    return this.usersService.getUserNamePointTitleCharacter(userNo);
  }

  @Patch("my/attendance")
  @ApiUpdateUserAttendance()
  @UseGuards(AccessTokenAuthGuard)
  updateUserAttendance(@UserNo() userNo: number) {
    return this.usersService.updateUserAttendance(userNo);
  }

  @Post("my/nickname")
  @ApiCreateUserNickname()
  @UseGuards(AccessTokenAuthGuard)
  createUserNickname(
    @UserNo() userNo: number,
    @Body() body: UpdateUserNicknameDto,
  ) {
    return this.usersService.createUserNickname(userNo, body);
  }

  @Put("my/description")
  @ApiUpdateUserDescription()
  @UseGuards(AccessTokenAuthGuard)
  updateUserDescription(
    @UserNo() userNo: number,
    @Body() body: UpdateUserDescriptionDto,
  ) {
    return this.usersService.updateUserDescription(userNo, body);
  }
}
