import { Injectable, NotFoundException } from "@nestjs/common";
import { CommentRepository } from "./comments.repository";
import { CreateCommentDto } from "./dtos/comment-dtos/create-comment.dto";
import { UpdateCommentDto } from "./dtos/comment-dtos/update-comment.dto";
import { GetCommentDto } from "./dtos/comment-dtos/get-comment.dto";
import { GetReplyDto } from "./dtos/replies-dtos/get-reply.dto";

@Injectable()
export class CommentService {
  constructor(private readonly CommentRepository: CommentRepository) {}

  createOneComment(
    receiverNo: number,
    senderNo: number,
    body: CreateCommentDto,
  ) {
    const { content } = body;

    return this.CommentRepository.createOneComment(
      receiverNo,
      senderNo,
      content,
    );
  }

  getManyComments(receiverNo: number, query: GetCommentDto) {
    const { page, take } = query;
    const skip = (page - 1) * take;
    return this.CommentRepository.getManyComments(receiverNo, skip, take);
  }

  async updateOneComment(commentNo: number, body: UpdateCommentDto) {
    const { content } = body;
    await this.commentNotFound(commentNo);
    return this.CommentRepository.updateOneComment(commentNo, content);
  }

  async softDeleteOneComment(commentNo: number) {
    await this.commentNotFound(commentNo);
    return this.CommentRepository.softDeleteOneComment(commentNo);
  }

  async createOneReply(
    commentNo: number,
    userNo: number,
    body: CreateCommentDto,
  ) {
    const { content } = body;
    await this.commentNotFound(commentNo);
    return this.CommentRepository.createOneReply(commentNo, userNo, content);
  }

  async getManyReplies(commentNo: number, query: GetReplyDto) {
    const { page, take } = query;
    await this.commentNotFound(commentNo);
    const skip = (page - 1) * take;
    return this.CommentRepository.getManyReplies(commentNo, skip, take);
  }

  async updateOneReply(
    commentNo: number,
    replyNo: number,
    body: UpdateCommentDto,
  ) {
    const { content } = body;
    await this.commentNotFound(commentNo);
    await this.replyNotFound(commentNo, replyNo);
    return this.CommentRepository.updateOneReply(commentNo, replyNo, content);
  }

  async softDeleteOneReply(commentNo: number, replyNo: number) {
    await this.commentNotFound(commentNo);
    await this.replyNotFound(commentNo, replyNo);
    const deleteReply = await this.CommentRepository.softDeleteOneReply(
      commentNo,
      replyNo,
    );
    return deleteReply;
  }

  async commentNotFound(commentNo: number) {
    const comment = await this.CommentRepository.getOneComment(commentNo);
    if (!comment) {
      throw new NotFoundException("해당 방명록은 존재하지 않습니다.");
    }
  }

  async replyNotFound(commentNo: number, replyNo: number) {
    const reply = await this.CommentRepository.getOneReply(commentNo, replyNo);
    if (!reply) {
      throw new NotFoundException("해당 댓글은 존재하지 않습니다.");
    }
  }
}
