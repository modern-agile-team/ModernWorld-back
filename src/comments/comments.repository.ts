import { Injectable } from "@nestjs/common";
import { OrderBy } from "src/common/enum/order-by.enum";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaTxType } from "src/prisma/prisma.type";
import { DEFAULT_REPLIES_SELECT_OPTIONS } from "./constants/default-replies-select-options.constant";
import { DEFAULT_COMMENTS_SELECT_OPTIONS } from "./constants/default-comments-select-options.constant";
import { Prisma } from "@prisma/client";

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  countCommentsByUserNo(where: Prisma.commentWhereInput) {
    return this.prisma.comment.count({
      where,
    });
  }

  countRepliesByCommentNo(where: Prisma.replyWhereInput) {
    return this.prisma.reply.count({ where });
  }

  createOneComment(
    receiverNo: number,
    senderNo: number,
    content: string,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).comment.create({
      select: {
        ...DEFAULT_COMMENTS_SELECT_OPTIONS,
      },
      data: {
        receiverNo,
        senderNo,
        content,
      },
    });
  }

  findOneCommentNotDeleted(commentNo: number) {
    return this.prisma.comment.findUnique({
      where: {
        no: commentNo,
        deletedAt: null,
      },
    });
  }

  getManyComments(skip: number, take: number, orderBy: OrderBy, where: object) {
    return this.prisma.comment.findMany({
      select: {
        ...DEFAULT_COMMENTS_SELECT_OPTIONS,
        _count: { select: { reply: { where: { deletedAt: null } } } },
      },
      skip,
      take,
      orderBy: { no: orderBy },
      where,
    });
  }

  updateOneComment(no: number, content: string) {
    return this.prisma.comment.update({
      select: {
        ...DEFAULT_COMMENTS_SELECT_OPTIONS,
      },
      where: {
        no,
      },
      data: {
        content,
      },
    });
  }

  updateCommentToDelete(no: number) {
    return this.prisma.comment.update({
      where: {
        no,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  createOneReply(
    commentNo: number,
    userNo: number,
    content: string,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).reply.create({
      select: {
        ...DEFAULT_REPLIES_SELECT_OPTIONS,
      },
      data: {
        commentNo,
        userNo,
        content,
      },
    });
  }

  findOneReplyNotDeleted(replyNo: number) {
    return this.prisma.reply.findUnique({
      where: {
        no: replyNo,
        deletedAt: null,
      },
    });
  }

  getManyReplies(
    skip: number,
    take: number,
    orderBy: OrderBy,
    where: Prisma.replyWhereInput,
  ) {
    return this.prisma.reply.findMany({
      select: {
        ...DEFAULT_REPLIES_SELECT_OPTIONS,
      },
      skip,
      take,
      orderBy: { no: orderBy },
      where,
    });
  }

  updateOneReply(no: number, content: string) {
    return this.prisma.reply.update({
      select: {
        ...DEFAULT_REPLIES_SELECT_OPTIONS,
      },
      where: {
        no,
      },
      data: {
        content,
      },
    });
  }

  softDeleteOneReply(no: number) {
    return this.prisma.reply.update({
      where: {
        no,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
