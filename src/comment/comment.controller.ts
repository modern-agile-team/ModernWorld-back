import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(":receiverNo")
  createComment(
    @Param("receiverNo") receiverNo: number,
    @Body() content: CreateCommentDto,
  ) {
    const userNo = 1;
    return this.commentService.commentCreate(receiverNo, userNo, content);
  }

  @Get(":senderNo")
  findAllComment(
    @Param("senderNo") senderNo: number,
    @Query("page") page: number,
  ) {
    return this.commentService.findComment(senderNo, page);
  }

  @Patch(":no")
  update(@Param("no") no: number, @Body("content") content: string) {
    return this.commentService.updateComment(no, content);
  }

  @Patch(":no")
  softDeletComment(@Param("no") no: number) {
    return this.commentService.softDeleteComment(no);
  }
}
