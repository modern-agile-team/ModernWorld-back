import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PresentStatus } from "@prisma/client";
import { PrismaTxType } from "src/prisma/prisma.type";

@Injectable()
export class PresentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOnePresent(presentNo: number) {
    return this.prisma.present.findUnique({
      where: { no: presentNo },
    });
  }

  getPresents(where: object) {
    return this.prisma.present.findMany({
      select: {
        no: true,
        status: true,
        createdAt: true,
        item: { select: { name: true, image: true, description: true } },
        userPresentSenderNo: { select: { no: true, nickname: true } },
        userPresentReceiverNo: { select: { no: true, nickname: true } },
      },
      where,
      orderBy: { no: "desc" },
    });
  }

  getUserOnePresentWithItemUserInfo(presentNo: number) {
    return this.prisma.present.findUnique({
      select: {
        no: true,
        status: true,
        createdAt: true,
        senderDelete: true,
        receiverDelete: true,
        item: { select: { name: true, image: true, description: true } },
        userPresentSenderNo: { select: { no: true, nickname: true } },
        userPresentReceiverNo: { select: { no: true, nickname: true } },
      },
      where: {
        no: presentNo,
      },
    });
  }

  createOneItemToUser(
    senderNo: number,
    receiverNo: number,
    itemNo: number,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).present.create({
      data: { senderNo, receiverNo, itemNo },
    });
  }

  updateOnePresentStatusFromUnreadToRead(presentNo: number) {
    return this.prisma.present.update({
      select: {
        no: true,
        status: true,
        createdAt: true,
        senderDelete: true,
        receiverDelete: true,
        item: { select: { name: true, image: true, description: true } },
        userPresentSenderNo: { select: { no: true, nickname: true } },
        userPresentReceiverNo: { select: { no: true, nickname: true } },
      },
      data: { status: "read" },
      where: { no: presentNo, status: "unread" },
    });
  }

  updateOnePresentStatus(presentNo: number, status: PresentStatus) {
    return this.prisma.present.update({
      data: { status },
      where: { no: presentNo },
    });
  }

  updateOnePresentToDeleteByUser(
    presentNo: number,
    senderReceiverDeleteField: "senderDelete" | "receiverDelete",
  ) {
    return this.prisma.present.update({
      data: { [senderReceiverDeleteField]: true },
      where: {
        no: presentNo,
      },
    });
  }
}
