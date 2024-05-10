import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AcceptReject, PresentStatus } from "./enum/present-status-enum";
import { SenderReceiverNoField } from "./enum/present-senderReceiverNo-enum";
import { PrismaPromise, present } from "@prisma/client";

@Injectable()
export class PresentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOnePresent(presentNo: number): PrismaPromise<present> {
    return this.prisma.present.findUnique({
      where: { no: presentNo },
    });
  }

  getPresents(
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

  getOnePresentWithItemUserInformation(presentNo: number) {
    return this.prisma.present.findUnique({
      select: {
        no: true,
        status: true,
        createdAt: true,
        item: { select: { name: true, image: true, description: true } },
        userPresentSenderNo: { select: { no: true, nickname: true } },
        userPresentReceiverNo: { select: { no: true, nickname: true } },
      },
      where: {
        no: presentNo,
      },
    });
  }

  updateOnePresentStatusFromUnreadToRead(presentNo: number) {
    return this.prisma.present.update({
      data: { status: "read" },
      where: { no: presentNo, status: "unread" },
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

  updateOnePresentToDeleteBySenderReceiver(
    presentNo: number,
    senderReceiverDeleteField: string,
  ) {
    return this.prisma.present.update({
      data: { [senderReceiverDeleteField]: true },
      where: {
        no: presentNo,
      },
    });
  }
}
