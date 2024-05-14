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

  //offset 기반 pagination
  //인기(좋아요), 최신유저, 랭킹(누적포인트 랭킹)
  @Get()
  @ApiOperation({ summary: "유저 불러오기 API" })
  getUsersByAnimal(@Query() queryParams: GetUsersByAnimalDto) {
    /**
     * pageNo는 페이지의 번호
     * take는 몇개씩 가져올것인가
     * animal은 그 사람이 현재 사용중인 동물, 어차피 개 고양이밖에 없음 만약 주지않는다면 모든 유저를 불러옴
     * orderByField는 어떤 식으로 정렬할것인지에 대한 정보
     */

    //VALIDATION !!!!!! orderByField의 값은 정해져있어야함, like, createdAt, accumulationPoint 이 세개로 한정해야함
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

  //유저 출석부 조회
  @Get(":userNo/attendance")
  @ApiOperation({ summary: "유저 출석부 조회 API" })
  getOneUserAttendance(@Param("userNo", ParseIntPipe) userNo: number) {
    return this.usersService.getUserAttendance(userNo);
  }

  //유저 출석부 체크
  @Patch(":userNo/attendance")
  @ApiOperation({ summary: "유저 출석부 체크 API" })
  markUserAttendance(@Param("userNo", ParseIntPipe) userNo: number) {
    const tokenUserNo = 1;

    return this.usersService.markUserAttendance(tokenUserNo, userNo);
  }

  //유저 닉네임, 자기소개 Update
  @Patch(":userNo")
  updateUser(
    @Param("userNo", ParseIntPipe) userNo: number,
    @Body("nickname") nickname: string,
    @Body("characterNo", ParseIntPipe) characterNo: number,
    @Body("description") description: string,
  ) {
    return this.usersService.updateUserNicknameDescriptionAttendanceCharacter(
      userNo,
      characterNo,
      nickname,
      description,
    );
  }
}
