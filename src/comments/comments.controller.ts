import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { CommentService } from "./comments.service";
import { CommentContentDto } from "./dtos/comment-dtos/comment-content.dto";
import { ApiTags } from "@nestjs/swagger";
import { ApiCreateOneComment } from "./swagger-decorators/comment-swagger/create-one-comment.decorator";
import { ApiFindComments } from "./swagger-decorators/comment-swagger/find-comments.decorator";
import { ApiUpdateComment } from "./swagger-decorators/comment-swagger/update-comment.decorator";
import { ApiDeleteOneComment } from "./swagger-decorators/comment-swagger/delete-one-comment.decorator";
import { ApiFindRelies } from "./swagger-decorators/reply-swagger/find-reply.decorator";
import { ApiDeleteReply } from "./swagger-decorators/reply-swagger/delete-reply.decorator";
import { ApiUpdateReply } from "./swagger-decorators/reply-swagger/update-reply.decorator";
import { ApiCreateReply } from "./swagger-decorators/reply-swagger/create-reply.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { PaginationDto } from "src/common/dtos/pagination.dto";

@Controller()
@ApiTags("Comments & Replies")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiCreateOneComment()
  @Post("users/:userNo/comments")
  createOneComment(
    @Param("userNo", ParsePositiveIntPipe) receiverNo: number,
    @Body() body: CommentContentDto,
  ) {
    const userNo = 1;

    return this.commentService.createOneComment(receiverNo, userNo, body);
  }

  @Get("users/:userNo/comments")
  @ApiFindComments()
  getManyComments(
    @Param("userNo", ParsePositiveIntPipe) userNo: number,
    @Query() query: PaginationDto,
  ) {
    return this.commentService.getManyComments(userNo, query);
  }

  @Patch("users/my/comments/:commentNo")
  @ApiUpdateComment()
  updatOneComment(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Body() body: CommentContentDto,
  ) {
    const userNo = 1;

    return this.commentService.updateOneComment(userNo, commentNo, body);
  }

  @Delete("users/my/comments/:commentNo")
  @ApiDeleteOneComment()
  @HttpCode(204)
  softDeleteOneComment(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
  ) {
    const userNo = 1;

    return this.commentService.softDeleteOneComment(userNo, commentNo);
  }

  @Post("comments/:commentNo/replies")
  @ApiCreateReply()
  createOneReply(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Body() body: CommentContentDto,
  ) {
    const userNo = 1;

    return this.commentService.createOneReply(commentNo, userNo, body);
  }

  @Get("comments/:commentNo/replies")
  @ApiFindRelies()
  getManyReplies(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Query() query: PaginationDto,
  ) {
    return this.commentService.getManyReplies(commentNo, query);
  }

  @Patch("comments/:commentNo/replies/:replyNo")
  @ApiUpdateReply()
  updateOneReply(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Param("replyNo", ParsePositiveIntPipe) replyNo: number,
    @Body() body: CommentContentDto,
  ) {
    const userNo = 1;

    return this.commentService.updateOneReply(userNo, commentNo, replyNo, body);
  }

  @Delete("comments/:commentNo/replies/:replyNo")
  @ApiDeleteReply()
  @HttpCode(204)
  softDeleteOneReply(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Param("replyNo", ParsePositiveIntPipe) replyNo: number,
  ) {
    const userNo = 1;

    return this.commentService.softDeleteOneReply(userNo, commentNo, replyNo);
  }
}
