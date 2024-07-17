import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CommentRepository } from "./comments.repository";
import { CommentContentDto } from "./dtos/comment-dtos/comment-content.dto";
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
    const { senderNo } = await this.findOneCommentNotDeleted(commentNo);

    if (userNo !== senderNo) {
      throw new ForbiddenException("User can update only their comment.");
    }

    return this.commentRepository.updateOneComment(commentNo, content);
  }

  async softDeleteOneComment(userNo: number, commentNo: number) {
    const { senderNo } = await this.findOneCommentNotDeleted(commentNo);

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
    await this.findOneCommentNotDeleted(commentNo);

    const { content } = body;

    return this.commentRepository.createOneReply(commentNo, userNo, content);
  }

  async getManyReplies(commentNo: number, query: PaginationDto) {
    await this.findOneCommentNotDeleted(commentNo);

    const { take, page, orderBy } = query;
    const skip = take * (page - 1);
    const totalCount =
      await this.commentRepository.countRepliesByCommentNo(commentNo);

    const totalPage = Math.ceil(totalCount / take);

    const replies = await this.commentRepository.getManyReplies(
      commentNo,
      skip,
      take,
      orderBy,
    );

    return new PaginationResponseDto(replies, {
      page,
      take,
      totalCount,
      totalPage,
    });
  }

  async updateOneReply(
    commentNo: number,
    replyNo: number,
    body: CommentContentDto,
  ) {
    const { content } = body;
    await this.findOneCommentNotDeleted(commentNo);
    await this.findOneReplyNotDeleted(replyNo);

    return this.commentRepository.updateOneReply(commentNo, replyNo, content);
  }

  async softDeleteOneReply(commentNo: number, replyNo: number) {
    await this.findOneCommentNotDeleted(commentNo);
    await this.findOneReplyNotDeleted(replyNo);
    const deleteReply = await this.commentRepository.softDeleteOneReply(
      commentNo,
      replyNo,
    );

    return deleteReply;
  }

  async findOneCommentNotDeleted(commentNo: number) {
    const comment =
      await this.commentRepository.findOneCommentNotDeleted(commentNo);

    if (!comment) {
      throw new NotFoundException("해당 방명록은 존재하지 않습니다.");
    }

    return comment;
  }

  async findOneReplyNotDeleted(replyNo: number) {
    const reply = await this.commentRepository.findOneReplyNotDeleted(replyNo);

    if (!reply) {
      throw new NotFoundException("해당 댓글은 존재하지 않습니다.");
    }

    return reply;
  }
}
