import { Injectable } from "@nestjs/common";
import { OrderBy } from "src/common/enum/order-by.enum";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  countCommentsByUserNo(receiverNo: number) {
    return this.prisma.comment.count({ where: { receiverNo } });
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

  getOneComment(commentNo: number) {
    return this.prisma.comment.findUnique({
      where: {
        no: commentNo,
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

  updateOneComment(id: number, content: string) {
    return this.prisma.comment.update({
      where: {
        no: id,
      },
      data: {
        content,
      },
    });
  }

  softDeleteOneComment(id: number) {
    return this.prisma.comment.update({
      where: {
        no: id,
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

  getOneReply(commentNo: number, replyNo: number) {
    return this.prisma.reply.findUnique({
      where: {
        no: replyNo,
        commentNo,
      },
    });
  }

  getManyReplies(commentNo: number, skip: number, take: number) {
    return this.prisma.reply.findMany({
      skip,
      take,
      orderBy: { no: "desc" },
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
