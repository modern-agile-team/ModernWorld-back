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
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { GetCommentDto } from "./dto/get-comment.dto";
import { ApiTags } from "@nestjs/swagger";
import { ApiCreateComment } from "./swagger-decorators/create-comment-decorator";
import { ApiFindComments } from "./swagger-decorators/find-comments-decorator";
import { ApiUpdateComment } from "./swagger-decorators/update-comment-decorator";
import { ApiDeleteComment } from "./swagger-decorators/delete-comments-decorator";

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

  @Get()
  @ApiFindComments()
  getComment(@Query() queryParams: GetCommentDto) {
    const userNo = 1;
    return this.commentService.getComment(userNo, queryParams);
  }

  @Patch(":commnetNo")
  @ApiUpdateComment()
  updateComment(
    @Param("commnetNo", ParseIntPipe) commentNo: number,
    @Body() content: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(commentNo, content);
  }

  @Delete(":commnetNo")
  @ApiDeleteComment()
  softDeleteComment(@Param("commnetNo", ParseIntPipe) commentNo: number) {
    return this.commentService.softDeleteComment(commentNo);
  }
}
