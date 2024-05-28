import { Controller, Delete, Param, ParseIntPipe, Post } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { ApiTags } from "@nestjs/swagger";

@Controller("likes")
@ApiTags("Likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post("users/:userNo")
  test(@Param("userNo", ParseIntPipe) userNo: number) {
    const tokenUserNo = 1;

    return this.likesService.createOneLike();
  }

  @Delete("users/:userNo")
  test2(@Param("userNo", ParseIntPipe) userNo: number) {
    const tokenUserNo = 1;

    return this.likesService.deleteOneLike();
  }
}
