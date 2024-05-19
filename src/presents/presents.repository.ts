import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AcceptReject, PresentStatus } from "./enum/present-status-enum";
import { SenderReceiverNoField } from "./enum/present-senderReceiverNo-enum";
import { PrismaPromise, present, present_status } from "@prisma/client";

@Injectable()
export class PresentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOnePresent(presentNo: number): PrismaPromise<present> {
    return this.prisma.present.findUnique({
      where: { no: presentNo },
    });
  }

  getPresents(where: object): PrismaPromise<
    {
      no: number;
      status: present_status;
      createdAt: Date;
      item: { name: string };
      userPresentSenderNo: { no: number; nickname: string };
      userPresentReceiverNo: { no: number; nickname: string };
    }[]
  > {
    return this.prisma.present.findMany({
      select: {
        no: true,
        status: true,
        createdAt: true,
        item: { select: { name: true } },
        userPresentSenderNo: { select: { no: true, nickname: true } },
        userPresentReceiverNo: { select: { no: true, nickname: true } },
      },
      where,
      orderBy: { no: "desc" },
    });
  }

  getOnePresentWithItemUserInfo(presentNo: number): PrismaPromise<{
    no: number;
    status: present_status;
    createdAt: Date;
    item: { name: string };
    userPresentSenderNo: { no: number; nickname: string };
    userPresentReceiverNo: { no: number; nickname: string };
  }> {
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

  createOneItemToUser(
    senderNo: number,
    receiverNo: number,
    itemNo: number,
  ): PrismaPromise<present> {
    return this.prisma.present.create({
      data: { senderNo, receiverNo, itemNo },
    });
  }

  updateOnePresentStatusFromUnreadToRead(
    presentNo: number,
  ): PrismaPromise<present> {
    return this.prisma.present.update({
      data: { status: "read" },
      where: { no: presentNo, status: "unread" },
    });
  }

  updateOnePresentStatus(
    presentNo: number,
    status: PresentStatus | AcceptReject,
  ): PrismaPromise<present> {
    return this.prisma.present.update({
      data: { status },
      where: { no: presentNo },
    });
  }

  updateOnePresentToDeleteByUser(
    presentNo: number,
    senderReceiverDeleteField: string,
  ): PrismaPromise<present> {
    return this.prisma.present.update({
      data: { [senderReceiverDeleteField]: true },
      where: {
        no: presentNo,
      },
    });
  }
}
