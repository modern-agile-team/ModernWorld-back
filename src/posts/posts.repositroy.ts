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
    {
      no: number;
      check: boolean;
      createdAt: Date;
      userPostSenderNo: { nickname: string };
      userPostReceiverNo: { nickname: string };
    }[]
  > {
    return this.prisma.post.findMany({
      select: {
        no: true,
        check: true,
        createdAt: true,
        userPostSenderNo: { select: { nickname: true } },
        userPostReceiverNo: { select: { nickname: true } },
      },
      where,
    });
  }

  getOnePostWithUserName(postNo: number): PrismaPromise<{
    no: number;
    senderNo: number;
    receiverNo: number;
    content: string;
    check: boolean;
    createdAt: Date;
    userPostSenderNo: { nickname: string };
    userPostReceiverNo: { nickname: string };
  }> {
    return this.prisma.post.findUnique({
      select: {
        no: true,
        senderNo: true,
        receiverNo: true,
        content: true,
        check: true,
        createdAt: true,
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

  updateOnePostCheckToTrue(postNo: number) {
    return this.prisma.post.update({
      data: { check: true },
      where: { no: postNo },
    });
  }

  deleteOnePost(postNo: number) {
    return 0;
  }
}
