import { Injectable } from "@nestjs/common";
import { PrismaPromise, comment, reply } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  createOneComment(
    receiverNo: number,
    senderNo: number,
    content: string,
  ): PrismaPromise<comment> {
    return this.prisma.comment.create({
      data: {
        receiverNo,
        senderNo,
        content,
      },
    });
  }

  getOneComment(commentNo: number): PrismaPromise<comment> {
    return this.prisma.comment.findUnique({
      where: {
        no: commentNo,
      },
    });
  }

  getManyComments(
    receiverNo: number,
    commentPage: number,
    take: number,
  ): PrismaPromise<comment[]> {
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

  updateOneComment(id: number, content: string): PrismaPromise<comment> {
    return this.prisma.comment.update({
      where: {
        no: id,
      },
      data: {
        content,
      },
    });
  }

  softDeleteOneComment(id: number): PrismaPromise<comment> {
    return this.prisma.comment.update({
      where: {
        no: id,
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
  ): PrismaPromise<reply> {
    return this.prisma.reply.create({
      data: {
        commentNo,
        userNo,
        content,
      },
    });
  }

  getOneReply(replyNo: number): PrismaPromise<comment> {
    return this.prisma.comment.findUnique({
      where: {
        no: replyNo,
      },
    });
  }

  getManyReplies(
    commentNo: number,
    replyPage: number,
    take: number,
  ): PrismaPromise<reply[]> {
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

  updateOneReply(replyNo: number, content: string): PrismaPromise<reply> {
    return this.prisma.reply.update({
      where: {
        no: replyNo,
      },
      data: {
        content,
      },
    });
  }

  softDeleteOneReply(replyNo: number): PrismaPromise<reply> {
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
