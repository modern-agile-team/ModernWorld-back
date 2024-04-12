import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  //offset 기반 pagination
  //인기(좋아요), 최신유저, 랭킹(누적포인트 랭킹)
  constructor(private readonly userService: UsersService) {}
  @Get("show")
  showUsersByAnimal(
    @Query("pageNo", ParseIntPipe) pageNo: number,
    @Query("take", ParseIntPipe) take: number,
    @Query("animal")
    animal: string,
    @Query("orderField") orderField: string,
  ) {
    /**
     * pageNo는 페이지의 번호
     * take는 몇개씩 가져올것인가
     * animal은 그 사람이 현재 사용중인 동물, 어차피 개 고양이밖에 없음
     * orderField는 어떤 식으로 정렬할것인지에 대한 정보
     */
    //VALIDATION !!!!!! orderField의 값은 정해져있어야함, like, created_at, accumulationPoint 이 세개로 한정해야함
    return this.userService.showUsersByAnimal(pageNo, take, orderField, animal);
  }

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
