import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
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
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { UserNo } from "src/auth/auth.decorator";
import { GetOnePostResponseDto } from "./dtos/get-one-post-response.dto";

//해당 로직은 Presents와 동일한 부분이 많음. 해당 부분 참고할것
@Controller()
@ApiTags("Posts")
@UseGuards(AccessTokenAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get("users/my/posts")
  @ApiGetPosts()
  @UseGuards(AccessTokenAuthGuard)
  getPosts(
    @UserNo() userNo: number,
    @Query()
    query: GetPostsDto,
  ) {
    return this.postsService.getUserPosts(userNo, query);
  }

  @Get("users/my/posts/:postNo")
  @ApiGetOnePost()
  @UseGuards(AccessTokenAuthGuard)
  async getOnePost(
    @UserNo() userNo: number,
    @Param("postNo", ParsePositiveIntPipe) postNo: number,
  ) {
    return new GetOnePostResponseDto(
      await this.postsService.getOnePostByUserNo(userNo, postNo),
    );
  }

  @Post("users/:userNo/posts")
  @ApiCreateOnePost()
  @UseGuards(AccessTokenAuthGuard)
  createOnePost(
    @UserNo() userNo: number,
    @Param("userNo", ParsePositiveIntPipe) receiverNo: number,
    @Body()
    body: PostContentDto,
  ) {
    return this.postsService.createOnePost(userNo, receiverNo, body);
  }

  @Delete("users/my/posts/:postNo")
  @ApiDeleteOnePost()
  @HttpCode(204)
  @UseGuards(AccessTokenAuthGuard)
  deleteOnePost(
    @UserNo() userNo: number,
    @Param("postNo", ParsePositiveIntPipe) postNo: number,
  ) {
    return this.postsService.updateOnePostToDelete(userNo, postNo);
  }
}
