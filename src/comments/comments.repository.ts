import { Injectable } from "@nestjs/common";
import { OrderBy } from "src/common/enum/order-by.enum";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaTxType } from "src/prisma/prisma.type";

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  countCommentsByUserNo(where: object) {
    return this.prisma.comment.count({
      where,
    });
  }

  countRepliesByCommentNo(commentNo: number) {
    return this.prisma.reply.count({ where: { commentNo } });
  }

  createOneComment(
    receiverNo: number,
    senderNo: number,
    content: string,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).comment.create({
      select: {
        no: true,
        content: true,
        createdAt: true,
        commentReceiver: { select: { no: true, nickname: true } },
        commentSender: { select: { no: true, nickname: true } },
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
        no: true,
        content: true,
        createdAt: true,
        commentReceiver: { select: { no: true, nickname: true } },
        commentSender: { select: { no: true, nickname: true } },
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
        no: true,
        content: true,
        createdAt: true,
        commentReceiver: { select: { no: true, nickname: true } },
        commentSender: { select: { no: true, nickname: true } },
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
        no: true,
        commentNo: true,
        content: true,
        createdAt: true,
        user: { select: { no: true, nickname: true } },
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
    commentNo: number,
    skip: number,
    take: number,
    orderBy: OrderBy,
  ) {
    return this.prisma.reply.findMany({
      select: {
        no: true,
        commentNo: true,
        content: true,
        createdAt: true,
        user: { select: { no: true, nickname: true } },
      },
      skip,
      take,
      orderBy: { no: orderBy },
      where: {
        commentNo,
        deletedAt: null,
      },
    });
  }

  updateOneReply(no: number, content: string) {
    return this.prisma.reply.update({
      select: {
        no: true,
        commentNo: true,
        content: true,
        createdAt: true,
        user: { select: { no: true, nickname: true } },
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
