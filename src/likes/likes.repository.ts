import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaTxType } from "src/prisma/prisma.type";

@Injectable()
export class LikesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOneLike(senderNo: number, receiverNo: number) {
    return this.prisma.like.findFirst({ where: { senderNo, receiverNo } });
  }

  createOneLike(senderNo: number, receiverNo: number, tx?: PrismaTxType) {
    return (tx ?? this.prisma).like.create({
      select: {
        no: true,
        userLikeSenderNo: { select: { no: true, nickname: true } },
        userLikeReceiverNo: { select: { no: true, nickname: true } },
      },
      data: { senderNo, receiverNo },
    });
  }

  deleteOneLike(no: number) {
    return this.prisma.like.delete({ where: { no } });
  }
}
