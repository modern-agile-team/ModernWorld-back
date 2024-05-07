import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AcceptReject, PresentStatus } from "./enum/present-status-enum";
import { SenderReceiverNoField } from "./enum/present-senderReceiverNo-enum";
import { PrismaPromise, item, present } from "@prisma/client";

@Injectable()
export class PresentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOnePresent(presentNo: number): PrismaPromise<present> {
    return this.prisma.present.findUnique({
      where: { no: presentNo },
    });
  }

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
    senderReceiverNoField: SenderReceiverNoField,
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

  getInboxPresentStatusItemNo(
    userNo: number,
    presentNo: number,
  ): PrismaPromise<Pick<present, "status" | "itemNo">> {
    return this.prisma.present.findFirst({
      select: { status: true, itemNo: true },

      where: { no: presentNo, receiverNo: userNo },
    });
  }

  updateOnePresentStatus(
    presentNo: number,
    status: PresentStatus | AcceptReject,
  ) {
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
