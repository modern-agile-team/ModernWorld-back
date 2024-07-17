import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from "@nestjs/common";
import { CommentService } from "./comments.service";
import { CreateCommentDto } from "./dtos/comment-dtos/create-comment.dto";
import { UpdateCommentDto } from "./dtos/comment-dtos/update-comment.dto";
import { ApiTags } from "@nestjs/swagger";
import { ApiCreateComment } from "./swagger-decorators/comment-swagger/create-comment-decorator";
import { ApiFindComments } from "./swagger-decorators/comment-swagger/find-comments-decorator";
import { ApiUpdateComment } from "./swagger-decorators/comment-swagger/update-comment-decorator";
import { ApiDeleteComment } from "./swagger-decorators/comment-swagger/delete-comments-decorator";
import { GetReplyDto } from "./dtos/replies-dtos/get-reply.dto";
import { ApiFindRelies } from "./swagger-decorators/reply-swagger/find-reply-decorate";
import { ApiDeleteReply } from "./swagger-decorators/reply-swagger/delete-reply-decorate";
import { ApiUpdateReply } from "./swagger-decorators/reply-swagger/update-reply-decorate";
import { ApiCreateReply } from "./swagger-decorators/reply-swagger/create-reply-decorater";
import { CreateReplyDto } from "./dtos/replies-dtos/create-reply.dto";
import { UpdateReplyDto } from "./dtos/replies-dtos/update-reply.dto";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { PaginationDto } from "src/common/dtos/pagination.dto";

@Controller()
@ApiTags("Comments & Replies")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @ApiCreateComment()
  @Post("users/:userNo/comments")
  createOneComment(
    @Param("userNo", ParsePositiveIntPipe) receiverNo: number,
    @Body() body: CreateCommentDto,
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
    @Body() body: UpdateCommentDto,
  ) {
    const userNo = 1;

    return this.commentService.updateOneComment(userNo, commentNo, body);
  }

  @Delete("users/:userNo/comments/:commentNo")
  @ApiDeleteComment()
  softDeleteOneComment(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
  ) {
    return this.commentService.softDeleteOneComment(commentNo);
  }

  @Post("comments/:commentNo/replies")
  @ApiCreateReply()
  createOneReply(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Body() body: CreateReplyDto,
  ) {
    const userNo = 1;
    return this.commentService.createOneReply(commentNo, userNo, body);
  }

  @Get("comments/:commentNo/replies")
  @ApiFindRelies()
  getManyReplies(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Query() query: GetReplyDto,
  ) {
    return this.commentService.getManyReplies(commentNo, query);
  }

  @Patch("comments/:commentNo/replies/:replyNo")
  @ApiUpdateReply()
  updateOneReply(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Param("replyNo", ParsePositiveIntPipe) replyNo: number,
    @Body() body: UpdateReplyDto,
  ) {
    return this.commentService.updateOneReply(commentNo, replyNo, body);
  }

  @Delete("comments/:commentNo/replies/:replyNo")
  @ApiDeleteReply()
  softDeleteOneReply(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Param("replyNo", ParsePositiveIntPipe) replyNo: number,
  ) {
    return this.commentService.softDeleteOneReply(commentNo, replyNo);
  }
}
