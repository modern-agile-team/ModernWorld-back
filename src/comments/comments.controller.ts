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
import { GetReplyDto } from "./dtos/replies-dtos/get_reply.dto";
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
  createComment(
    @Param("receiverNo", ParseIntPipe) receiverNo: number,
    @Body() content: CreateCommentDto,
  ) {
    const userNo = 1;
    return this.commentService.createComment(receiverNo, userNo, content);
  }

  @Get(":receiverNo")
  @ApiFindComments()
  getComment(
    @Param("receiverNo", ParseIntPipe) receiverNo: number,
    @Query() queryParams: GetCommentDto,
  ) {
    return this.commentService.getComment(receiverNo, queryParams);
  }

  @Patch(":commentNo")
  @ApiUpdateComment()
  updateComment(
    @Param("commentNo", ParseIntPipe) commentNo: number,
    @Body() content: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(commentNo, content);
  }

  @Delete(":commentNo")
  @ApiDeleteComment()
  softDeleteComment(@Param("commentNo", ParseIntPipe) commentNo: number) {
    return this.commentService.softDeleteComment(commentNo);
  }

  @Post(":commentNo/reply")
  @ApiCreateReply()
  createReply(
    @Param("commentNo", ParseIntPipe) commentNo: number,
    @Body() content: CreateReplyDto,
  ) {
    const userNo = 1;
    return this.commentService.createReply(commentNo, userNo, content);
  }

  @Get(":commentNo/reply")
  @ApiFindRelies()
  getReply(
    @Param("commentNo", ParseIntPipe) commentNo: number,
    @Query() queryParams: GetReplyDto,
  ) {
    return this.commentService.getReplies(commentNo, queryParams);
  }

  @Patch("reply/:replyNo")
  @ApiUpdateReply()
  updateReply(
    @Param("replyNo", ParseIntPipe) replyNo: number,
    @Body() content: UpdateReplyDto,
  ) {
    return this.commentService.updateReply(replyNo, content);
  }

  @Delete("reply/:replyNo")
  @ApiDeleteReply()
  softDeleteReply(@Param("replyNo", ParseIntPipe) replyNo: number) {
    return this.commentService.softDeleteReply(replyNo);
  }
}
