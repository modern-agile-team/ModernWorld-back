import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
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
    createcontent: CreateCommentDto,
  ) {
    const { content } = createcontent;

    return this.CommentRepository.createOneComment(
      receiverNo,
      senderNo,
      content,
    );
  }

  getManyComments(receiverNo: number, queryParams: GetCommentDto) {
    const { page, take } = queryParams;
    const skip = (page - 1) * take;
    return this.CommentRepository.getManyComments(receiverNo, skip, take);
  }

  async updateOneComment(commentNo: number, createcontent: UpdateCommentDto) {
    const { content } = createcontent;
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
    createContent: CreateCommentDto,
  ) {
    const { content } = createContent;
    await this.commentNotFound(commentNo);
    return this.CommentRepository.createOneReply(commentNo, userNo, content);
  }

  async getManyReplies(commentNo: number, queryParams: GetReplyDto) {
    const { page, take } = queryParams;
    await this.commentNotFound(commentNo);
    const skip = (page - 1) * take;
    return this.CommentRepository.getManyReplies(commentNo, skip, take);
  }

  async updateOneReply(
    commentNo: number,
    replyNo: number,
    replyContent: UpdateCommentDto,
  ) {
    const { content } = replyContent;
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

    if (!deleteReply.deletedAt) {
      throw new InternalServerErrorException(
        "댓글을 삭제하는 과정 중 오류가 발생했습니다.",
      );
    }

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
