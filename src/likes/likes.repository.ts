import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LikesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOneLike(senderNo: number, receiverNo: number) {
    return this.prisma.like.findFirst({ where: { senderNo, receiverNo } });
  }

  createOneLike(senderNo: number, receiverNo: number) {
    return this.prisma.like.create({ data: { senderNo, receiverNo } });
  }

  deleteOneLike(no: number) {
    return this.prisma.like.delete({ where: { no } });
  }
}
