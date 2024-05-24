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

  getOnePost(postNo: number) {
    return this.prisma.post.findUniqueOrThrow({ where: { no: postNo } });
  }

  createOnePost(senderNo: number, receiverNo: number, content: string) {
    return 0;
  }

  deleteOnePost(postNo: number) {
    return 0;
  }
}
