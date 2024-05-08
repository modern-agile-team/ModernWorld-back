import { Injectable } from "@nestjs/common";
import { comment } from "@prisma/client";
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
}
