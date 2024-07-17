import { Injectable } from "@nestjs/common";
import { OrderBy } from "src/common/enum/order-by.enum";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  countCommentsByUserNo(receiverNo: number) {
    return this.prisma.comment.count({ where: { receiverNo } });
  }

  countRepliesByCommentNo(commentNo: number) {
    return this.prisma.reply.count({ where: { commentNo } });
  }

  createOneComment(receiverNo: number, senderNo: number, content: string) {
    return this.prisma.comment.create({
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

  getManyComments(
    receiverNo: number,
    skip: number,
    take: number,
    orderBy: OrderBy,
  ) {
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
      where: {
        receiverNo,
        deletedAt: null,
      },
    });
  }

  updateOneComment(no: number, content: string) {
    return this.prisma.comment.update({
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

  createOneReply(commentNo: number, userNo: number, content: string) {
    return this.prisma.reply.create({
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
      skip,
      take,
      orderBy: { no: orderBy },
      where: {
        commentNo,
        deletedAt: null,
      },
    });
  }

  updateOneReply(commentNo: number, replyNo: number, content: string) {
    return this.prisma.reply.update({
      where: {
        no: replyNo,
        commentNo,
      },
      data: {
        content,
      },
    });
  }

  softDeleteOneReply(commentNo: number, replyNo: number) {
    return this.prisma.reply.update({
      where: {
        no: replyNo,
        commentNo,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
