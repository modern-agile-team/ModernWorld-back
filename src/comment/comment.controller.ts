import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

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

  @Get(":senderNo")
  findAllComment(
    @Param("senderNo", ParseIntPipe) senderNo: number,
    @Query("page", ParseIntPipe) page: number,
  ) {
    return this.commentService.findComment(senderNo, page);
  }

  @Patch(":no")
  update(
    @Param("no", ParseIntPipe) no: number,
    @Body() content: CreateCommentDto,
  ) {
    return this.commentService.updateComment(no, content);
  }

  @Patch(":no")
  softDeletComment(@Param("no", ParseIntPipe) no: number) {
    return this.commentService.softDeleteComment(no);
  }
}
