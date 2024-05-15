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

@Controller("users")
@ApiTags("Users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: "유저 불러오기 API" })
  getUsersByAnimal(@Query() queryParams: GetUsersByAnimalDto) {
    return this.usersService.getUsersByAnimal(queryParams);
  }

  @Get(":userNo")
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

  @Get(":userNo/attendance")
  @ApiOperation({ summary: "유저 출석부 조회 API" })
  getOneUserAttendance(@Param("userNo", ParseIntPipe) userNo: number) {
    return this.usersService.getUserAttendance(userNo);
  }

  @Patch(":userNo/attendance")
  @ApiOperation({ summary: "유저 출석부 체크 API" })
  markUserAttendance(@Param("userNo", ParseIntPipe) userNo: number) {
    const tokenUserNo = 1;

    return this.usersService.markUserAttendance(tokenUserNo, userNo);
  }

  @Patch(":userNo/nickname")
  updateUser(
    @Param("userNo", ParseIntPipe) userNo: number,
    @Body("nickname") nickname: string,
  ) {
    const tokenUserNo = 1;

    return this.usersService.updateUserNickname(tokenUserNo, userNo, nickname);
  }

  @Patch(":userNo/description")
  updateUserDescription(
    @Param("userNo", ParseIntPipe) userNo: number,
    @Body("description") description: string,
  ) {
    // return this.usersService.
  }
}
