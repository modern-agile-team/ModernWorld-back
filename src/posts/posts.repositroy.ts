import { Injectable } from "@nestjs/common";
import { PrismaPromise, post } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOnePostByNo(postNo: number): PrismaPromise<post> {
    return this.prisma.post.findUnique({ where: { no: postNo } });
  }

  getPosts(where: object): PrismaPromise<
    (Omit<post, "content" | "senderDelete" | "receiverDelete"> & {
      userPostSenderNo: { nickname: string };
      userPostReceiverNo: { nickname: string };
    })[]
  > {
    return this.prisma.post.findMany({
      select: {
        no: true,
        senderNo: true,
        receiverNo: true,
        check: true,
        createdAt: true,
        userPostSenderNo: { select: { nickname: true } },
        userPostReceiverNo: { select: { nickname: true } },
      },
      where,
    });
  }

  getOnePostWithUser(postNo: number): PrismaPromise<
    post & {
      userPostSenderNo: { nickname: string };
      userPostReceiverNo: { nickname: string };
    }
  > {
    return this.prisma.post.findUnique({
      select: {
        no: true,
        senderNo: true,
        receiverNo: true,
        content: true,
        check: true,
        createdAt: true,
        senderDelete: true,
        receiverDelete: true,
        userPostSenderNo: { select: { nickname: true } },
        userPostReceiverNo: { select: { nickname: true } },
      },
      where: { no: postNo },
    });
  }

  createOnePost(
    senderNo: number,
    receiverNo: number,
    content: string,
  ): PrismaPromise<post> {
    return this.prisma.post.create({ data: { senderNo, receiverNo, content } });
  }

  updateOnePostCheckToTrue(postNo: number): PrismaPromise<post> {
    return this.prisma.post.update({
      data: { check: true },
      where: { no: postNo },
    });
  }

  updateOnePresentToDeleteByUser(
    no: number,
    senderReceiverDeleteField: string,
  ): PrismaPromise<post> {
    return this.prisma.post.update({
      data: { [senderReceiverDeleteField]: true },
      where: { no },
    });
  }
}
