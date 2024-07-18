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
import { ApiGetComments } from "./swagger-decorators/comment-swagger/get-comments.decorator";
import { ApiUpdateComment } from "./swagger-decorators/comment-swagger/update-comment.decorator";
import { ApiDeleteOneComment } from "./swagger-decorators/comment-swagger/delete-one-comment.decorator";
import { ApiGetRelies } from "./swagger-decorators/reply-swagger/get-replies.decorator";
import { ApiDeleteOneReply } from "./swagger-decorators/reply-swagger/delete-one-reply.decorator";
import { ApiUpdateOneReply } from "./swagger-decorators/reply-swagger/update-one-reply.decorator";
import { ApiCreateOneReply } from "./swagger-decorators/reply-swagger/create-one-reply.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { CommentsPaginationDto } from "./dtos/comment-dtos/comments-pagination.dto";

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
  @ApiGetComments()
  getManyComments(
    @Param("userNo", ParsePositiveIntPipe) userNo: number,
    @Query() query: CommentsPaginationDto,
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
  @ApiCreateOneReply()
  createOneReply(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Body() body: CommentContentDto,
  ) {
    const userNo = 1;

    return this.commentService.createOneReply(commentNo, userNo, body);
  }

  @Get("comments/:commentNo/replies")
  @ApiGetRelies()
  getManyReplies(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Query() query: PaginationDto,
  ) {
    return this.commentService.getManyReplies(commentNo, query);
  }

  @Patch("comments/:commentNo/replies/:replyNo")
  @ApiUpdateOneReply()
  updateOneReply(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Param("replyNo", ParsePositiveIntPipe) replyNo: number,
    @Body() body: CommentContentDto,
  ) {
    const userNo = 1;

    return this.commentService.updateOneReply(userNo, commentNo, replyNo, body);
  }

  @Delete("comments/:commentNo/replies/:replyNo")
  @ApiDeleteOneReply()
  @HttpCode(204)
  softDeleteOneReply(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Param("replyNo", ParsePositiveIntPipe) replyNo: number,
  ) {
    const userNo = 1;

    return this.commentService.softDeleteOneReply(userNo, commentNo, replyNo);
  }
}
