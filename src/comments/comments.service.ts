import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CommentRepository } from "./comments.repository";
import { CommentContentDto } from "./dtos/comment-dtos/comment-content.dto";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PaginationResponseDto } from "src/common/dtos/pagination-response.dto";
import { CommentsPaginationDto } from "./dtos/comment-dtos/comments-pagination.dto";

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

  async getManyComments(userNo: number, query: CommentsPaginationDto) {
    const { take, page, orderBy, type } = query;
    const skip = take * (page - 1);

    const where = type
      ? {
          [type]: userNo,
          deletedAt: null,
        }
      : {
          OR: [
            { senderNo: userNo, deletedAt: null },
            { receiverNo: userNo, deletedAt: null },
          ],
        };

    const totalCount =
      await this.commentRepository.countCommentsByUserNo(where);

    const totalPage = Math.ceil(totalCount / take);

    const comments = await this.commentRepository.getManyComments(
      skip,
      take,
      orderBy,
      where,
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
    senderNo: number,
    commentNo: number,
    replyNo: number,
    body: CommentContentDto,
  ) {
    await this.findOneCommentNotDeleted(commentNo);
    const { userNo } = await this.findOneReplyNotDeleted(replyNo);

    const { content } = body;

    if (senderNo !== userNo) {
      throw new ForbiddenException("User can update only their reply.");
    }

    return this.commentRepository.updateOneReply(replyNo, content);
  }

  async softDeleteOneReply(
    senderNo: number,
    commentNo: number,
    replyNo: number,
  ) {
    await this.findOneCommentNotDeleted(commentNo);
    const { userNo } = await this.findOneReplyNotDeleted(replyNo);

    if (senderNo !== userNo) {
      throw new ForbiddenException("User can delete only their reply.");
    }

    return await this.commentRepository.softDeleteOneReply(replyNo);
  }

  async findOneCommentNotDeleted(commentNo: number) {
    const comment =
      await this.commentRepository.findOneCommentNotDeleted(commentNo);

    if (!comment) {
      throw new NotFoundException("There is no comment with that number.");
    }

    return comment;
  }

  async findOneReplyNotDeleted(replyNo: number) {
    const reply = await this.commentRepository.findOneReplyNotDeleted(replyNo);

    if (!reply) {
      throw new NotFoundException("There is no reply with that number.");
    }

    return reply;
  }
}
