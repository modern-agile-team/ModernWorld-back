import { Injectable } from "@nestjs/common";
import { comment, reply } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  createComment(
    receiverNo: number,
    senderNo: number,
    content: string,
  ): Promise<comment> {
    return this.prisma.comment.create({
      data: {
        receiverNo,
        senderNo,
        content,
      },
    });
  }

  getComment(
    receiverNo: number,
    commentPage: number,
    take: number,
  ): Promise<comment[]> {
    return this.prisma.comment.findMany({
      skip: commentPage,
      take,
      orderBy: { no: "desc" },
      where: {
        receiverNo,
        deletedAt: null,
      },
    });
  }

  updateComment(id: number, content: string): Promise<comment> {
    return this.prisma.comment.update({
      where: {
        no: id,
      },
      data: {
        content,
      },
    });
  }

  softDeleteComment(id: number): Promise<comment> {
    return this.prisma.comment.update({
      where: {
        no: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  createReply(
    commentNo: number,
    userNo: number,
    content: string,
  ): Promise<reply> {
    return this.prisma.reply.create({
      data: {
        commentNo,
        userNo,
        content,
      },
    });
  }

  getReplies(
    commentNo: number,
    replyPage: number,
    take: number,
  ): Promise<reply[]> {
    return this.prisma.reply.findMany({
      skip: replyPage,
      take,
      orderBy: { no: "desc" },
      where: {
        commentNo,
        deletedAt: null,
      },
    });
  }

  updateReply(replyNo: number, content: string): Promise<reply> {
    return this.prisma.reply.update({
      where: {
        no: replyNo,
      },
      data: {
        content,
      },
    });
  }

  softDeleteReply(replyNo: number): Promise<reply> {
    return this.prisma.reply.update({
      where: {
        no: replyNo,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
