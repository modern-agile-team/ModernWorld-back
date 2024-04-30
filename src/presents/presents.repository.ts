import { Injectable } from "@nestjs/common";
import { read } from "fs";
import { PrismaService } from "src/prisma/prisma.service";
import { PresentStatus } from "./enum/present-status-enum";

@Injectable()
export class PresentsRepository {
  constructor(private readonly prisma: PrismaService) {}
  getInboxPresentsByUserNo(userNo: number) {
    return this.prisma.present.findMany({
      select: {
        no: true,
        status: true,
        createdAt: true,
        item: { select: { name: true } },
        userPresentSenderNo: { select: { nickname: true } },
      },
      where: { receiverNo: userNo },
    });
  }

  getOutboxPresentsByUserNo(userNo: number) {
    return this.prisma.present.findMany({
      select: {
        no: true,
        status: true,
        createdAt: true,
        item: { select: { name: true } },
        userPresentReceiverNo: { select: { nickname: true } },
      },
      where: { senderNo: userNo },
    });
  }

  getInboxOnePresentByUserNoPresentNo(userNo: number, presentNo: number) {
    return this.prisma.present.findUnique({
      select: {
        no: true,
        status: true,
        createdAt: true,
        item: { select: { name: true, image: true, description: true } },
        userPresentSenderNo: { select: { nickname: true } },
      },
      where: { receiverNo: userNo, no: presentNo, receiverDelete: false },
    });
  }

  getOutboxOnePresentByUserNoPresentNo(userNo: number, presentNo: number) {
    return this.prisma.present.findUnique({
      select: {
        no: true,
        status: true,
        createdAt: true,
        item: { select: { name: true, image: true, description: true } },
        userPresentReceiverNo: { select: { nickname: true } },
      },
      where: {
        senderNo: userNo,
        no: presentNo,
        senderDelete: false,
      },
    });
  }

  updateOnePresentStatusFromUnreadToRead(presentNo: number) {
    return this.prisma.present.update({
      data: { status: "read" },
      where: { no: presentNo, status: "unread" },
    });
  }

  getInboxPresentStatusItemNo(userNo: number, presentNo: number) {
    return this.prisma.present.findFirst({
      select: { status: true, itemNo: true },

      where: { no: presentNo, receiverNo: userNo },
    });
  }

  updateOnePresentStatus(presentNo: number, status: PresentStatus) {
    return this.prisma.present.update({
      data: { status },
      where: { no: presentNo },
    });
  }
}
