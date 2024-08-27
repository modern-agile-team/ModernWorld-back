import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PresentStatus } from "@prisma/client";
import { PrismaTxType } from "src/prisma/prisma.type";
import { DEFAULT_PRESENTS_SELECT_OPTIONS } from "./constants/default-presents-select-options.constant";

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
        ...DEFAULT_PRESENTS_SELECT_OPTIONS,
      },
      where,
      orderBy: { no: "desc" },
    });
  }

  getUserOnePresentWithItemUserInfo(presentNo: number) {
    return this.prisma.present.findUnique({
      select: {
        ...DEFAULT_PRESENTS_SELECT_OPTIONS,
        senderDelete: true,
        receiverDelete: true,
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
        ...DEFAULT_PRESENTS_SELECT_OPTIONS,
        senderDelete: true,
        receiverDelete: true,
      },
      data: { status: "read" },
      where: { no: presentNo, status: "unread" },
    });
  }

  updateOnePresentStatus(
    presentNo: number,
    status: PresentStatus,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).present.update({
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
