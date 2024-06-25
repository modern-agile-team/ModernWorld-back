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
import { CreateCommentDto } from "./dtos/create-comment.dto";
import { UpdateCommentDto } from "./dtos/update-comment.dto";
import { GetCommentDto } from "./dtos/get-comment.dto";
import { ApiTags } from "@nestjs/swagger";
import { ApiCreateComment } from "./swagger-decorators/create-comment-decorator";
import { ApiFindComments } from "./swagger-decorators/find-comments-decorator";
import { ApiUpdateComment } from "./swagger-decorators/update-comment-decorator";
import { ApiDeleteComment } from "./swagger-decorators/delete-comments-decorator";
import { GetReplyDto } from "./dtos/get_reply.dto";

@Controller("comments")
@ApiTags("Comments")
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
  createReply(
    @Param("commentNo", ParseIntPipe) commentNo: number,
    @Body() content: CreateCommentDto,
  ) {
    const userNo = 1;
    return this.commentService.createReply(commentNo, userNo, content);
  }

  @Get(":commentNo/reply")
  getReply(
    @Param("commentNo", ParseIntPipe) commentNo: number,
    @Query() queryParams: GetReplyDto,
  ) {
    return this.commentService.getReplies(commentNo, queryParams);
  }

  @Patch("reply/:replyNo")
  updateReply(
    @Param("replyNo", ParseIntPipe) replyNo: number,
    @Body() content: UpdateCommentDto,
  ) {
    return this.commentService.updateReply(replyNo, content);
  }

  @Delete("reply/:replyNo")
  softDeleteReply(@Param("replyNo", ParseIntPipe) replyNo: number) {
    return this.commentService.softDeleteReply(replyNo);
  }
}
