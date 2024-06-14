import { Injectable } from "@nestjs/common";
import { PrismaPromise, like } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LikesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOneLike(senderNo: number, receiverNo: number): PrismaPromise<like> {
    return this.prisma.like.findFirst({ where: { senderNo, receiverNo } });
  }

  createOneLike(senderNo: number, receiverNo: number): PrismaPromise<like> {
    return this.prisma.like.create({ data: { senderNo, receiverNo } });
  }

  deleteOneLike(
    senderNo: number,
    receiverNo: number,
  ): PrismaPromise<{ count: number }> {
    return this.prisma.like.deleteMany({ where: { senderNo, receiverNo } });
  }
}
