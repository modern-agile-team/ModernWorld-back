import { Injectable } from "@nestjs/common";
import { comment } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  createComment(receiverNo: number, senderNo: number, content: string) {
    return this.prisma.comment.create({
      data: {
        receiverNo,
        senderNo,
        content,
      },
    });
  }

  findComment(senderNo: number, commentPage: number) {
    return this.prisma.comment.findMany({
      skip: commentPage,
      take: 2,
      orderBy: { no: "desc" },
      where: {
        senderNo,
        deletedAt: null,
      },
    });
  }

  updateComment(id: number, content: string) {
    return this.prisma.comment.update({
      where: {
        no: id,
      },
      data: {
        content,
      },
    });
  }

  softDeleteComment(id: number) {
    return this.prisma.comment.update({
      where: {
        no: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
