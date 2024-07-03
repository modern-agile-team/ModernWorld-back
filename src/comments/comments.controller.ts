import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
  Delete,
} from "@nestjs/common";
import { CommentService } from "./comments.service";
import { CreateCommentDto } from "./dtos/comment-dtos/create-comment.dto";
import { UpdateCommentDto } from "./dtos/comment-dtos/update-comment.dto";
import { GetCommentDto } from "./dtos/comment-dtos/get-comment.dto";
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

@Controller("comments")
@ApiTags("Comments & Replies")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @ApiCreateComment()
  @Post(":receiverNo")
  createOneComment(
    @Param("receiverNo", ParseIntPipe) receiverNo: number,
    @Body() content: CreateCommentDto,
  ) {
    const userNo = 1;
    return this.commentService.createOneComment(receiverNo, userNo, content);
  }

  @Get(":receiverNo")
  @ApiFindComments()
  getManyComments(
    @Param("receiverNo", ParseIntPipe) receiverNo: number,
    @Query() queryParams: GetCommentDto,
  ) {
    return this.commentService.getManyComments(receiverNo, queryParams);
  }

  @Patch(":commentNo")
  @ApiUpdateComment()
  updatOneComment(
    @Param("commentNo", ParseIntPipe) commentNo: number,
    @Body() content: UpdateCommentDto,
  ) {
    return this.commentService.updateOneComment(commentNo, content);
  }

  @Delete(":commentNo")
  @ApiDeleteComment()
  softDeleteOneComment(@Param("commentNo", ParseIntPipe) commentNo: number) {
    return this.commentService.softDeleteOneComment(commentNo);
  }

  @Post(":commentNo/replies")
  @ApiCreateReply()
  createOneReply(
    @Param("commentNo", ParseIntPipe) commentNo: number,
    @Body() content: CreateReplyDto,
  ) {
    const userNo = 1;
    return this.commentService.createOneReply(commentNo, userNo, content);
  }

  @Get(":commentNo/replies")
  @ApiFindRelies()
  getManyReplies(
    @Param("commentNo", ParseIntPipe) commentNo: number,
    @Query() queryParams: GetReplyDto,
  ) {
    return this.commentService.getManyReplies(commentNo, queryParams);
  }

  @Patch(":commentNo/replies/:replyNo")
  @ApiUpdateReply()
  updateOneReply(
    @Param("commentNo", ParseIntPipe) commentNo: number,
    @Param("replyNo", ParseIntPipe) replyNo: number,
    @Body() content: UpdateReplyDto,
  ) {
    return this.commentService.updateOneReply(commentNo, replyNo, content);
  }

  @Delete(":commentNo/replies/:replyNo")
  @ApiDeleteReply()
  softDeleteOneReply(
    @Param("commentNo", ParseIntPipe) commentNo: number,
    @Param("replyNo", ParseIntPipe) replyNo: number,
  ) {
    return this.commentService.softDeleteOneReply(commentNo, replyNo);
  }
}
