import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PresentsRepository {
  constructor(private readonly prisma: PrismaService) {}
  getInboxPresentsByUserNo(userNo: number) {
    return this.prisma.present.findMany({
      select: {
        no: true,
        status: true,
        createdAt: true,
        userPresentSenderNo: { select: { nickname: true } },
        item: { select: { name: true } },
      },
      where: { receiverNo: userNo },
    });
  }

  getOutboxPresentsByUserNo(userNo: number) {
    return this.prisma.present.findMany({
      where: { senderNo: userNo },
    });
  }
}
