import { Controller, Delete, Param, ParseIntPipe, Post } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("likes")
@ApiTags("Likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post("users/:userNo")
  @ApiOperation({ summary: "좋아요 생성" })
  createOneLike(@Param("userNo", ParseIntPipe) receiverNo: number) {
    const tokenUserNo = 1;

    return this.likesService.createOneLike(tokenUserNo, receiverNo);
  }

  @Delete("users/:userNo")
  @ApiOperation({ summary: "좋아요 삭제" })
  deleteOneLike(@Param("userNo", ParseIntPipe) receiverNo: number) {
    const tokenUserNo = 1;

    return this.likesService.deleteOneLike(tokenUserNo, receiverNo);
  }
}