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

  @Post("/:receiver_no")
  createComment(
    @Param("receiver_no") receiver_no: number,
    @Body("sender_no") sender_no: number,
    @Body("content") content: string,
  ) {
    return this.commentService.commentCreate(receiver_no, sender_no, content);
  }

  // @Get()
  // findAll() {
  //   return this.commentService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.commentService.findOne(+id);
  // }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentService.update(+id, updateCommentDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.commentService.remove(+id);
  // }
}
