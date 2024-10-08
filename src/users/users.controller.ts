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
import { ApiGetOneUser } from "./users-swagger/get-one-user.decorator";
import { ApiCreateUserNickname } from "./users-swagger/create-user-nickname.decorator";
import { ApiUpdateUserDescription } from "./users-swagger/update-user-description.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { UserNo } from "src/auth/auth.decorator";
import { UpdateUserAttendanceDto } from "./dtos/update-user-attendance.dto";
import { PaginationResponseDto } from "src/common/dtos/pagination-response.dto";

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
  async getUsers(@Query() query: GetUsersByAnimalDto) {
    const { users, ...meta } = await this.usersService.getUsers(query);

    return new PaginationResponseDto(users, meta);
  }

  @Get(":userNo")
  @ApiGetOneUser()
  @UseGuards(AccessTokenAuthGuard)
  getOneUser(@Param("userNo", ParsePositiveIntPipe) userNo: number) {
    return this.usersService.getOneUser(userNo);
  }

  @Patch("my/attendance")
  @ApiUpdateUserAttendance()
  @UseGuards(AccessTokenAuthGuard)
  updateUserAttendance(
    @UserNo() userNo: number,
    @Body() body: UpdateUserAttendanceDto,
  ) {
    return this.usersService.updateUserAttendance(userNo, body);
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
