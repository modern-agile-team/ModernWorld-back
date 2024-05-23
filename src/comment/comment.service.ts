import { Injectable, NotFoundException } from "@nestjs/common";
import { CommentRepository } from "./comment.repository";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { GetCommentDto } from "./dto/get-comment.dto";

@Injectable()
export class CommentService {
  constructor(private readonly CommentRepository: CommentRepository) {}
  async createComment(
    receiverNo: number,
    senderNo: number,
    createcontent: CreateCommentDto,
  ) {
    const { content } = createcontent;

    return await this.CommentRepository.createComment(
      receiverNo,
      senderNo,
      content,
    );
  }

  async getComment(senderNo: number, queryParams: GetCommentDto) {
    const { page, take } = queryParams;
    const commentPage = (page - 1) * 2;
    return await this.CommentRepository.getComment(senderNo, commentPage, take);
  }

  async updateComment(id: number, createcontent: UpdateCommentDto) {
    const { content } = createcontent;
    return await this.CommentRepository.updateComment(id, content);
  }

  async softDeleteComment(id: number) {
    return await this.CommentRepository.softDeleteComment(id);
  }
}
