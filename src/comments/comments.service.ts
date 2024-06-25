import { Injectable } from "@nestjs/common";
import { CommentRepository } from "./comments.repository";
import { CreateCommentDto } from "./dtos/comment-dtos/create-comment.dto";
import { UpdateCommentDto } from "./dtos/comment-dtos/update-comment.dto";
import { GetCommentDto } from "./dtos/comment-dtos/get-comment.dto";
import { GetReplyDto } from "./dtos/replies-dtos/get_reply.dto";

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

  async getComment(receiverNo: number, queryParams: GetCommentDto) {
    const { page, take } = queryParams;
    const skip = (page - 1) * take;
    return await this.CommentRepository.getComment(receiverNo, skip, take);
  }

  async updateComment(id: number, createcontent: UpdateCommentDto) {
    const { content } = createcontent;
    return await this.CommentRepository.updateComment(id, content);
  }

  async softDeleteComment(id: number) {
    return await this.CommentRepository.softDeleteComment(id);
  }

  async createReply(
    commentNo: number,
    userNo: number,
    createContent: CreateCommentDto,
  ) {
    const { content } = createContent;
    return await this.CommentRepository.createReply(commentNo, userNo, content);
  }

  async getReplies(commentNo: number, queryParams: GetReplyDto) {
    const { page, take } = queryParams;
    const skip = (page - 1) * take;
    return await this.CommentRepository.getReplies(commentNo, skip, take);
  }

  async updateReply(replyNo: number, replyContent: UpdateCommentDto) {
    const { content } = replyContent;
    return await this.CommentRepository.updateReply(replyNo, content);
  }

  async softDeleteReply(replyNo: number) {
    return await this.CommentRepository.softDeleteReply(replyNo);
  }
}
