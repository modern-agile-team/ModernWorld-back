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
import { createOnePostDto } from "./dto/create-post.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("posts")
@ApiTags("Posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get("/users/:userNo")
  getPosts(
    @Query("type", new ParseEnumPipe(SenderReceiverNoField, { optional: true }))
    type: SenderReceiverNoField,
  ) {
    const userNo = 1;

    return this.postsService.getPostsByUserNo(userNo, type);
  }

  @Get("/:postNo/users/:userNo")
  getOnePost(
    @Param("postNo", ParseIntPipe) postNo: number,
    @Param("userNo", ParseIntPipe) userNo: number,
  ) {
    const tokenUserNo = 1;

    return this.postsService.getOnePostByUserNo(tokenUserNo, postNo);
  }

  @Post("/users/:userNo")
  createPost(
    @Param("userNo", ParseIntPipe) userNo: number,
    @Body() body: createOnePostDto,
  ) {
    const tokenUserNo = 1;

    return this.postsService.createOnePost(tokenUserNo, userNo, body);
  }

  @Delete(":postNo")
  deletePost(@Query("postNo", ParseIntPipe) postNo: number) {
    // return this.postsService.deletePost();
  }
}
