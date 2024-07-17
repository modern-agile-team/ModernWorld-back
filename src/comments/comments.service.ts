import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CommentRepository } from "./comments.repository";
import { CommentContentDto } from "./dtos/comment-dtos/comment-content.dto";
import { GetReplyDto } from "./dtos/replies-dtos/get-reply.dto";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PaginationResponseDto } from "src/common/dtos/pagination-response.dto";

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  createOneComment(
    receiverNo: number,
    senderNo: number,
    body: CommentContentDto,
  ) {
    const { content } = body;

    return this.commentRepository.createOneComment(
      receiverNo,
      senderNo,
      content,
    );
  }

  async getManyComments(receiverNo: number, query: PaginationDto) {
    const { take, page, orderBy } = query;
    const skip = take * (page - 1);
    const totalCount =
      await this.commentRepository.countCommentsByUserNo(receiverNo);

    const totalPage = Math.ceil(totalCount / take);

    const comments = await this.commentRepository.getManyComments(
      receiverNo,
      skip,
      take,
      orderBy,
    );

    return new PaginationResponseDto(comments, {
      page,
      take,
      totalCount,
      totalPage,
    });
  }

  async updateOneComment(
    userNo: number,
    commentNo: number,
    body: CommentContentDto,
  ) {
    const { content } = body;
    const { senderNo } = await this.findOneComment(commentNo);

    if (userNo !== senderNo) {
      throw new ForbiddenException("User can update only their comment.");
    }

    return this.commentRepository.updateOneComment(commentNo, content);
  }

  async softDeleteOneComment(userNo: number, commentNo: number) {
    const { senderNo } = await this.findOneComment(commentNo);

    if (userNo !== senderNo) {
      throw new ForbiddenException("User can delete only their comment.");
    }

    return this.commentRepository.updateCommentToDelete(commentNo);
  }

  async createOneReply(
    commentNo: number,
    userNo: number,
    body: CommentContentDto,
  ) {
    const { content } = body;
    await this.findOneComment(commentNo);

    return this.commentRepository.createOneReply(commentNo, userNo, content);
  }

  async getManyReplies(commentNo: number, query: GetReplyDto) {
    const { page, take } = query;
    await this.findOneComment(commentNo);
    const skip = (page - 1) * take;

    return this.commentRepository.getManyReplies(commentNo, skip, take);
  }

  async updateOneReply(
    commentNo: number,
    replyNo: number,
    body: CommentContentDto,
  ) {
    const { content } = body;
    await this.findOneComment(commentNo);
    await this.replyNotFound(commentNo, replyNo);

    return this.commentRepository.updateOneReply(commentNo, replyNo, content);
  }

  async softDeleteOneReply(commentNo: number, replyNo: number) {
    await this.findOneComment(commentNo);
    await this.replyNotFound(commentNo, replyNo);
    const deleteReply = await this.commentRepository.softDeleteOneReply(
      commentNo,
      replyNo,
    );

    return deleteReply;
  }

  async findOneComment(commentNo: number) {
    const comment = await this.commentRepository.getOneComment(commentNo);
    if (!comment) {
      throw new NotFoundException("해당 방명록은 존재하지 않습니다.");
    }

    return comment;
  }

  async replyNotFound(commentNo: number, replyNo: number) {
    const reply = await this.commentRepository.getOneReply(commentNo, replyNo);
    if (!reply) {
      throw new NotFoundException("해당 댓글은 존재하지 않습니다.");
    }
  }
}
