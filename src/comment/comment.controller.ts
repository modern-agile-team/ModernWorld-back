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
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("comments")
@ApiTags("Comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(":receiverNo")
  @ApiOperation({
    summary: "방명록 생성하는 API",
    description: "방명록을 생성합니다.",
  })
  createComment(
    @Param("receiverNo", ParseIntPipe) receiverNo: number,
    @Body() content: CreateCommentDto,
  ) {
    const userNo = 1;
    return this.commentService.createComment(receiverNo, userNo, content);
  }

  @Get()
  @ApiOperation({
    summary: "방명록 조회하는 API",
    description: "방명록을 조회합니다.",
  })
  getComment(@Query() queryParams: GetCommentDto) {
    const userNo = 1;
    return this.commentService.getComment(userNo, queryParams);
  }

  @Patch(":commnetNo")
  @ApiOperation({
    summary: "방명록 수정하는 API",
    description: "방명록을 수정합니다.",
  })
  updateComment(
    @Param("commnetNo", ParseIntPipe) commentNo: number,
    @Body() content: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(commentNo, content);
  }

  @Delete(":commnetNo")
  @ApiOperation({
    summary: "방명록 삭제하는 API",
    description: "방명록을 삭제합니다. 하지만 db에는 존재합니다.",
  })
  softDeleteComment(@Param("commnetNo", ParseIntPipe) commentNo: number) {
    return this.commentService.softDeleteComment(commentNo);
  }
}
