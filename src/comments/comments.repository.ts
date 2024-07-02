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
    skip: number,
    take: number,
  ): PrismaPromise<comment[]> {
    return this.prisma.comment.findMany({
      skip,
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

  getOneReply(commentNo: number, replyNo: number): PrismaPromise<reply> {
    return this.prisma.reply.findUnique({
      where: {
        no: replyNo,
        commentNo,
      },
    });
  }

  getManyReplies(
    commentNo: number,
    skip: number,
    take: number,
  ): PrismaPromise<reply[]> {
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

  updateOneReply(
    commentNo: number,
    replyNo: number,
    content: string,
  ): PrismaPromise<reply> {
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

  softDeleteOneReply(commentNo: number, replyNo: number): PrismaPromise<reply> {
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
