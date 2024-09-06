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
  UseGuards,
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
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { UserNo } from "src/auth/auth.decorator";
import { ApiGetOneComment } from "./swagger-decorators/comment-swagger/get-one-comment.dto";
import { ApiGetOneReply } from "./swagger-decorators/reply-swagger/get-one-reply.decorator";
import { PaginationResponseDto } from "src/common/dtos/pagination-response.dto";

@Controller()
@ApiTags("Comments & Replies")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get("comments/:commentNo")
  @ApiGetOneComment()
  @UseGuards(AccessTokenAuthGuard)
  getOneComment(@Param("commentNo", ParsePositiveIntPipe) commentNo: number) {
    return this.commentService.findOneCommentNotDeleted(commentNo);
  }

  @Post("users/:userNo/comments")
  @ApiCreateOneComment()
  @UseGuards(AccessTokenAuthGuard)
  createOneComment(
    @UserNo() senderNo: number,
    @Param("userNo", ParsePositiveIntPipe) receiverNo: number,
    @Body() body: CommentContentDto,
  ) {
    return this.commentService.createOneComment(receiverNo, senderNo, body);
  }

  @Get("users/:userNo/comments")
  @ApiGetComments()
  @UseGuards(AccessTokenAuthGuard)
  async getManyComments(
    @Param("userNo", ParsePositiveIntPipe) userNo: number,
    @Query() query: CommentsPaginationDto,
  ) {
    const { comments, ...meta } = await this.commentService.getManyComments(
      userNo,
      query,
    );

    return new PaginationResponseDto(comments, meta);
  }

  @Patch("users/my/comments/:commentNo")
  @ApiUpdateComment()
  @UseGuards(AccessTokenAuthGuard)
  updatOneComment(
    @UserNo() userNo: number,
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Body() body: CommentContentDto,
  ) {
    return this.commentService.updateOneComment(userNo, commentNo, body);
  }

  @Delete("users/my/comments/:commentNo")
  @ApiDeleteOneComment()
  @HttpCode(204)
  @UseGuards(AccessTokenAuthGuard)
  softDeleteOneComment(
    @UserNo() userNo: number,
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
  ) {
    return this.commentService.softDeleteOneComment(userNo, commentNo);
  }

  @Get("replies/:replyNo")
  @ApiGetOneReply()
  @UseGuards(AccessTokenAuthGuard)
  getOneReply(@Param("replyNo", ParsePositiveIntPipe) replyNo: number) {
    return this.commentService.getOneReply(replyNo);
  }

  @Post("comments/:commentNo/replies")
  @ApiCreateOneReply()
  @UseGuards(AccessTokenAuthGuard)
  createOneReply(
    @UserNo() userNo: number,
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Body() body: CommentContentDto,
  ) {
    return this.commentService.createOneReply(commentNo, userNo, body);
  }

  @Get("comments/:commentNo/replies")
  @ApiGetRelies()
  @UseGuards(AccessTokenAuthGuard)
  async getManyReplies(
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Query() query: PaginationDto,
  ) {
    const { replies, ...meta } = await this.commentService.getManyReplies(
      commentNo,
      query,
    );

    return new PaginationResponseDto(replies, meta);
  }

  @Patch("comments/:commentNo/replies/:replyNo")
  @ApiUpdateOneReply()
  @UseGuards(AccessTokenAuthGuard)
  updateOneReply(
    @UserNo() userNo: number,
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Param("replyNo", ParsePositiveIntPipe) replyNo: number,
    @Body() body: CommentContentDto,
  ) {
    return this.commentService.updateOneReply(userNo, commentNo, replyNo, body);
  }

  @Delete("comments/:commentNo/replies/:replyNo")
  @ApiDeleteOneReply()
  @HttpCode(204)
  @UseGuards(AccessTokenAuthGuard)
  softDeleteOneReply(
    @UserNo() userNo: number,
    @Param("commentNo", ParsePositiveIntPipe) commentNo: number,
    @Param("replyNo", ParsePositiveIntPipe) replyNo: number,
  ) {
    return this.commentService.softDeleteOneReply(userNo, commentNo, replyNo);
  }
}
