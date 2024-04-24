import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Put,
  Query,
  Post,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { GetUsersByAnimalDto } from "./dtos/get-users-by-animal.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //offset 기반 pagination
  //인기(좋아요), 최신유저, 랭킹(누적포인트 랭킹)
  @Get("show/:pageNo")
  getUsersByAnimal(
    @Param("pageNo", ParseIntPipe) pageNo: number,
    @Query() queryParams: GetUsersByAnimalDto,
  ) {
    /**
     * pageNo는 페이지의 번호
     * take는 몇개씩 가져올것인가
     * animal은 그 사람이 현재 사용중인 동물, 어차피 개 고양이밖에 없음 만약 주지않는다면 모든 유저를 불러옴
     * orderByField는 어떤 식으로 정렬할것인지에 대한 정보
     */

    //VALIDATION !!!!!! orderByField의 값은 정해져있어야함, like, createdAt, accumulationPoint 이 세개로 한정해야함
    return this.userService.getUsersByAnimal(pageNo, queryParams);
  }

  @Get(":no")
  getOneUserWithNamePointAchievementTitle(
    @Param("no", ParseIntPipe) no: number,
  ) {
    return this.userService.getUserNameCurrentPointAccumulationPointTitle(no);
  }

  //사실 createUser는 회원가입할 때 같이 불러올 api임 따라서 Controller가 필요 없다. Service만 auth에서 사용하면 그만이다.
  // @Post()
  // createUser(
  //   @Body("uniqueIdentifier") uniqueIdentifier: string,
  //   @Body("socialName") socialName: string,
  //   @Body("image") image: string,
  //   @Body("domain") domain: string,
  // ) {
  //   return this.userService.createUser(
  //     uniqueIdentifier,
  //     socialName,
  //     image,
  //     domain,
  //   );
  // }

  @Put(":no")
  updateUser(
    @Param("no", ParseIntPipe) no: number,
    @Body("description") description: string,
  ) {
    return this.userService.updateUser({ no, description });
  }
}
