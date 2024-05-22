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

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(":receiverNo")
  createComment(
    @Param("receiverNo", ParseIntPipe) receiverNo: number,
    @Body() content: CreateCommentDto,
  ) {
    const userNo = 1;
    return this.commentService.commentCreate(receiverNo, userNo, content);
  }

  @Get()
  getComment(@Query("page", ParseIntPipe) page: number) {
    const userNo = 1;
    return this.commentService.getComment(userNo, page);
  }

  @Patch(":commnetNo")
  updateComment(
    @Param("commnetNo", ParseIntPipe) commentNo: number,
    @Body() content: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(commentNo, content);
  }

  @Delete(":commnetNo")
  softDeletComment(@Param("commnetNo", ParseIntPipe) commentNo: number) {
    return this.commentService.softDeleteComment(commentNo);
  }
}
