import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaTxType } from "src/prisma/prisma.type";

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  createOnePost(
    senderNo: number,
    receiverNo: number,
    content: string,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).post.create({
      select: {
        no: true,
        content: true,
        createdAt: true,
        check: true,
        userPostSenderNo: { select: { no: true, nickname: true } },
        userPostReceiverNo: { select: { no: true, nickname: true } },
      },
      data: { senderNo, receiverNo, content },
    });
  }

  getOnePost(postNo: number) {
    return this.prisma.post.findUnique({ where: { no: postNo } });
  }

  getPosts(where: object, orderBy: { no: "asc" | "desc" }) {
    return this.prisma.post.findMany({
      select: {
        no: true,
        content: true,
        createdAt: true,
        check: true,
        userPostSenderNo: { select: { no: true, nickname: true } },
        userPostReceiverNo: { select: { no: true, nickname: true } },
      },
      orderBy,
      where,
    });
  }

  getOnePostWithUser(postNo: number) {
    return this.prisma.post.findUnique({
      select: {
        no: true,
        content: true,
        createdAt: true,
        check: true,
        senderDelete: true,
        receiverDelete: true,
        userPostSenderNo: { select: { no: true, nickname: true } },
        userPostReceiverNo: { select: { no: true, nickname: true } },
      },
      where: { no: postNo },
    });
  }

  updateOnePostCheckToTrue(postNo: number) {
    return this.prisma.post.update({
      select: {
        no: true,
        content: true,
        check: true,
        createdAt: true,
        senderDelete: true,
        receiverDelete: true,
        userPostSenderNo: { select: { no: true, nickname: true } },
        userPostReceiverNo: { select: { no: true, nickname: true } },
      },
      data: { check: true },
      where: { no: postNo },
    });
  }

  updateOnePostToDeleteByUser(
    no: number,
    senderReceiverDeleteField: "senderDelete" | "receiverDelete",
  ) {
    return this.prisma.post.update({
      data: { [senderReceiverDeleteField]: true },
      where: { no },
    });
  }
}
