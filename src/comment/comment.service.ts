import { Injectable, NotFoundException } from "@nestjs/common";
import { CommentRepository } from "./comment.repository";
import { comment } from "@prisma/client";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentService {
  constructor(private readonly CommentRepository: CommentRepository) {}
  async commentCreate(
    receiverNo: number,
    senderNo: number,
    createcontent: CreateCommentDto,
  ) {
    const { content } = createcontent;

    const comment = await this.CommentRepository.createComment(
      receiverNo,
      senderNo,
      content,
    );
    return comment;
  }

  async findComment(senderNo: number, page: number) {
    const commentPage = (page - 1) * 2;
    const result = await this.CommentRepository.findComment(
      senderNo,
      commentPage,
    );
    return result;
  }

  async updateComment(id: number, createcontent: CreateCommentDto) {
    const { content } = createcontent;
    const result = await this.CommentRepository.updateComment(id, content);
    return result;
  }

  async softDeleteComment(id: number): Promise<comment> {
    const result = await this.CommentRepository.softDeleteComment(id);
    return result;
  }
}
