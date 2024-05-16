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
  findAllComment(@Query("page", ParseIntPipe) page: number) {
    const userNo = 1;
    return this.commentService.findComment(userNo, page);
  }

  @Patch(":no")
  updateComment(
    @Param("no", ParseIntPipe) no: number,
    @Body() content: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(no, content);
  }

  @Patch(":no")
  softDeletComment(@Param("no", ParseIntPipe) no: number) {
    return this.commentService.softDeleteComment(no);
  }
}
