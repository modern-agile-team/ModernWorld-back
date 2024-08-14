import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaTxType } from "src/prisma/prisma.type";
import { DEFAULT_POST_SELECT_OPTIONS } from "./constants/default-post-select-options.constant";

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
        ...DEFAULT_POST_SELECT_OPTIONS,
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
        ...DEFAULT_POST_SELECT_OPTIONS,
      },
      orderBy,
      where,
    });
  }

  getOnePostWithUser(postNo: number) {
    return this.prisma.post.findUnique({
      select: {
        ...DEFAULT_POST_SELECT_OPTIONS,
        senderDelete: true,
        receiverDelete: true,
      },
      where: { no: postNo },
    });
  }

  updateOnePostCheckToTrue(postNo: number) {
    return this.prisma.post.update({
      select: {
        ...DEFAULT_POST_SELECT_OPTIONS,
        senderDelete: true,
        receiverDelete: true,
      },
      data: { check: true },
      where: { no: postNo },
    });
  }

  updateOnePostToDeleteByUser(
    no: number,
    data: Pick<Prisma.postUpdateInput, "receiverDelete" | "senderDelete">,
  ) {
    return this.prisma.post.update({
      data,
      where: { no },
    });
  }
}
