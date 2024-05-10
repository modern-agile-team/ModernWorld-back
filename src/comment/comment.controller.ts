import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(":receiverNo")
  createComment(
    @Param("receiverNo") receiver_no: number,
    @Body("senderNo") sender_no: number,
    @Body("content") content: string,
  ) {
    return this.commentService.commentCreate(receiver_no, sender_no, content);
  }

  @Get(":senderNo")
  findAllComment(@Param("senderNo") senderNo: number) {
    return this.commentService.findComment(senderNo);
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
