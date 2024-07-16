import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostContentDto } from "./dtos/post-content.dto";
import { ApiTags } from "@nestjs/swagger";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { ApiCreateOnePost } from "./posts-swagger/create-one-post.decorator";
import { GetPostsDto } from "./dtos/get-posts.dto";
import { ApiGetPosts } from "./posts-swagger/get-posts.decorator";
import { ApiGetOnePost } from "./posts-swagger/get-one-post.decorator";
import { ApiDeleteOnePost } from "./posts-swagger/delete-one-post.decorator";

//해당 로직은 Presents와 동일한 부분이 많음. 해당 부분 참고할것
@Controller()
@ApiTags("Posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get("users/my/posts")
  @ApiGetPosts()
  getPosts(
    @Query()
    query: GetPostsDto,
  ) {
    const userNo = 1;

    return this.postsService.getUserPosts(userNo, query);
  }

  @Get("users/my/posts/:postNo")
  @ApiGetOnePost()
  getOnePost(@Param("postNo", ParsePositiveIntPipe) postNo: number) {
    const userNo = 1;

    return this.postsService.getOnePostByUserNo(userNo, postNo);
  }

  @Post("users/:userNo/posts")
  @ApiCreateOnePost()
  createOnePost(
    @Param("userNo", ParsePositiveIntPipe) receiverNo: number,
    @Body()
    body: PostContentDto,
  ) {
    const tokenUserNo = 1;

    return this.postsService.createOnePost(tokenUserNo, receiverNo, body);
  }

  @Delete("users/my/posts/:postNo")
  @ApiDeleteOnePost()
  @HttpCode(204)
  deleteOnePost(@Param("postNo", ParsePositiveIntPipe) postNo: number) {
    const userNo = 1;

    return this.postsService.updateOnePostToDelete(userNo, postNo);
  }
}
