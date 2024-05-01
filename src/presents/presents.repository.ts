import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PresentStatus } from "./enum/present-status-enum";
import { SenderReceiverNoField } from "./enum/present-senderReceiverNo-enum";

@Injectable()
export class PresentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getPresentsByBox(
    userNo: number,
    senderReceiverNoField: SenderReceiverNoField,
    senderReceiverDeleteField: string,
  ) {
    return this.prisma.present.findMany({
      select: {
        no: true,
        status: true,
        createdAt: true,
        item: { select: { name: true } },
        userPresentSenderNo: { select: { nickname: true } },
      },
      where: {
        [senderReceiverNoField]: userNo,
        [senderReceiverDeleteField]: false,
      },
    });
  }

  getOnePresentByBox(
    userNo: number,
    senderReceiverNoField: string,
    presentNo: number,
    senderReceiverDeleteField: string,
  ) {
    return this.prisma.present.findUnique({
      select: {
        no: true,
        status: true,
        createdAt: true,
        item: { select: { name: true, image: true, description: true } },
        userPresentSenderNo: { select: { nickname: true } },
      },
      where: {
        [senderReceiverNoField]: userNo,
        no: presentNo,
        [senderReceiverDeleteField]: false,
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

  updateOnePresentStatusToDeleteBySenderReceiver(
    userNo: number,
    senderReceiverNoField: SenderReceiverNoField,
    presentNo: number,
    senderReceiverDeleteField: string,
  ) {
    return this.prisma.present.update({
      data: { [senderReceiverDeleteField]: true },
      where: {
        no: presentNo,
        [senderReceiverNoField]: userNo,
      },
    });
  }
}
