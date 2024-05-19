import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Patch,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { GetUsersByAnimalDto } from "./dtos/get-users-by-animal.dto";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { UpdateUserNicknameDto } from "./dtos/update-user-nickname.dto";
import { UpdateUserDescriptionDto } from "./dtos/update-user-description.dto";

@Controller("users")
@ApiTags("Users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/attendance")
  @ApiOperation({ summary: "유저 출석부 조회 API" })
  getOneUserAttendance() {
    const userNo = 1;

    return this.usersService.getUserAttendance(userNo);
  }

  @Get()
  @ApiOperation({ summary: "유저 불러오기 API" })
  getUsers(@Query() queryParams: GetUsersByAnimalDto) {
    return this.usersService.getUsers(queryParams);
  }

  @Get("/:userNo")
  @ApiOperation({ summary: "특정 유저 불러오기 API" })
  @ApiParam({
    name: "userNo",
    example: 1,
    required: true,
    description: "유저 번호",
  })
  getUserNamePointAchievementTitle(
    @Param("userNo", ParseIntPipe) userNo: number,
  ) {
    return this.usersService.getUserNamePointTitleCharacter(userNo);
  }

  @Patch("/attendance")
  @ApiOperation({ summary: "유저 출석부 체크 API" })
  updateUserAttendance() {
    const userNo = 1;

    return this.usersService.updateUserAttendance(userNo);
  }

  @Patch("/nickname")
  @ApiOperation({ summary: "유저 닉네임 변경 API" })
  updateUserNickname(@Body() body: UpdateUserNicknameDto) {
    const userNo = 1;

    return this.usersService.updateUserNickname(userNo, body);
  }

  @Patch("/description")
  @ApiOperation({ summary: "유저 자기소개 변경 API" })
  updateUserDescription(@Body() body: UpdateUserDescriptionDto) {
    const userNo = 1;

    return this.usersService.updateUserDescription(userNo, body);
  }
}
