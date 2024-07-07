import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { LikesService } from "./likes.service";
import { ApiTags } from "@nestjs/swagger";
import { ApiCreateLike } from "./likes-swagger/create-like.decorator";
import { ApiDeleteLike } from "./likes-swagger/delete-like.decorator";
import { CreateOneLikeDto } from "./dtos/create-one-like.dto";
import { DeleteOneLikeDto } from "./dtos/delete-one-like.dto";

@Controller("likes")
@ApiTags("Likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @ApiCreateLike()
  createOneLike(@Body() body: CreateOneLikeDto) {
    const tokenUserNo = 1;

    return this.likesService.createOneLike(tokenUserNo, body);
  }

  @Delete()
  @ApiDeleteLike()
  @HttpCode(204)
  deleteOneLike(@Body() body: DeleteOneLikeDto) {
    const tokenUserNo = 1;

    return this.likesService.deleteOneLike(tokenUserNo, body);
  }
}
