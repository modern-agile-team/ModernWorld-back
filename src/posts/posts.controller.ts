import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { SenderReceiverNoField } from "src/presents/enum/present-senderReceiverNo.enum";
import { CreateOnePostDto } from "./dto/create-post.dto";
import { ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

@Controller("posts")
@ApiTags("Posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiQuery({ name: "type", required: false, enum: SenderReceiverNoField })
  getPosts(
    @Query("type", new ParseEnumPipe(SenderReceiverNoField, { optional: true }))
    senderReceiverNoField: SenderReceiverNoField,
  ) {
    const userNo = 1;

    return this.postsService.getPostsByUserNo(userNo, senderReceiverNoField);
  }

  @Get("/:postNo")
  @ApiParam({ name: "postNo", example: 1 })
  getOnePost(@Param("postNo", ParseIntPipe) postNo: number) {
    const userNo = 1;

    return this.postsService.getOnePostByUserNo(userNo, postNo);
  }

  @Post("/users/:userNo")
  createPost(
    @Param("userNo", ParseIntPipe) userNo: number,
    @Body() body: CreateOnePostDto,
  ) {
    const tokenUserNo = 1;

    return this.postsService.createOnePost(tokenUserNo, userNo, body);
  }

  @Delete(":postNo")
  deletePost(@Param("postNo", ParseIntPipe) postNo: number) {
    const userNo = 1;

    return this.postsService.updateOnePostToDelete(userNo, postNo);
  }
}
