import { Controller, Delete, Get, HttpCode, Param, Post } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { ApiTags } from "@nestjs/swagger";
import { ApiCreateLike } from "./likes-swagger/create-like.decorator";
import { ApiDeleteLike } from "./likes-swagger/delete-like.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { ApiFindOneLike } from "./likes-swagger/find-one-like.decorator";

@Controller()
@ApiTags("Likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post("users/:userNo/likes")
  @ApiCreateLike()
  createOneLike(@Param("userNo", ParsePositiveIntPipe) receiverNo: number) {
    const tokenUserNo = 1;

    return this.likesService.createOneLike(tokenUserNo, receiverNo);
  }

  @Delete("users/:userNo/likes")
  @ApiDeleteLike()
  @HttpCode(204)
  deleteOneLike(@Param("userNo", ParsePositiveIntPipe) receiverNo: number) {
    const tokenUserNo = 1;

    return this.likesService.deleteOneLike(tokenUserNo, receiverNo);
  }

  @Get("users/my/likes/:receiverNo")
  @ApiFindOneLike()
  findOneLike(@Param("receiverNo", ParsePositiveIntPipe) receiverNo: number) {
    const userNo = 1;

    return this.likesService.findOneLike(userNo, receiverNo);
  }
}
