import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { LikesService } from "./likes.service";
import { ApiTags } from "@nestjs/swagger";
import { ApiCreateLike } from "./likes-swagger/create-like.decorator";
import { ApiDeleteLike } from "./likes-swagger/delete-like.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { ApiFindOneLike } from "./likes-swagger/find-one-like.decorator";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { userNo } from "src/auth/auth.decorator";

@Controller()
@ApiTags("Likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post("users/:userNo/likes")
  @ApiCreateLike()
  @UseGuards(AccessTokenAuthGuard)
  createOneLike(
    @userNo() senderNo: number,
    @Param("userNo", ParsePositiveIntPipe)
    receiverNo: number,
  ) {
    return this.likesService.createOneLike(senderNo, receiverNo);
  }

  @Delete("users/:userNo/likes")
  @ApiDeleteLike()
  @HttpCode(204)
  @UseGuards(AccessTokenAuthGuard)
  deleteOneLike(
    @userNo() senderNo: number,
    @Param("userNo", ParsePositiveIntPipe) receiverNo: number,
  ) {
    return this.likesService.deleteOneLike(senderNo, receiverNo);
  }

  @Get("users/my/likes/:receiverNo")
  @ApiFindOneLike()
  @UseGuards(AccessTokenAuthGuard)
  findOneLike(
    @userNo() senderNo: number,
    @Param("receiverNo", ParsePositiveIntPipe) receiverNo: number,
  ) {
    return this.likesService.findOneLike(senderNo, receiverNo);
  }
}
