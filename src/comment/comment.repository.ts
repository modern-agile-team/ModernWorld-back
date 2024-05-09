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

  findComment(senderNo: number) {
    return this.prisma.comment.findMany({
      where: {
        senderNo,
      },
    });
  }

  removeComment(id: number) {
    return this.prisma.comment.delete({
      where: {
        no: id,
      },
    });
  }
}
