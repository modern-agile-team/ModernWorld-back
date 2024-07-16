import { Controller, Delete, HttpCode, Param, Post } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { ApiTags } from "@nestjs/swagger";
import { ApiCreateLike } from "./likes-swagger/create-like.decorator";
import { ApiDeleteLike } from "./likes-swagger/delete-like.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";

@Controller("users/:userNo/likes")
@ApiTags("Likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @ApiCreateLike()
  createOneLike(@Param("userNo", ParsePositiveIntPipe) receiverNo: number) {
    const tokenUserNo = 1;

    return this.likesService.createOneLike(tokenUserNo, receiverNo);
  }

  @Delete()
  @ApiDeleteLike()
  @HttpCode(204)
  deleteOneLike(@Param("userNo", ParsePositiveIntPipe) receiverNo: number) {
    const tokenUserNo = 1;

    return this.likesService.deleteOneLike(tokenUserNo, receiverNo);
  }
}
