import { Injectable } from "@nestjs/common";
import { PrismaPromise, post } from "@prisma/client";
import { SenderReceiverNoField } from "src/presents/enum/present-senderReceiverNo.enum";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getPosts(userNo: number, type: SenderReceiverNoField): PrismaPromise<post[]> {
    return this.prisma.post.findMany({
      where: { OR: [{ senderNo: userNo }, { receiverNo: userNo }] },
    });
  }

  getOnePost(postNo: number): PrismaPromise<{
    no: number;
    senderNo: number;
    receiverNo: number;
    content: string;
    check: boolean;
    createdAt: Date;
    userPostSenderNo: { nickname: string };
    userPostReceiverNo: { nickname: string };
  }> {
    return this.prisma.post.findUniqueOrThrow({
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
