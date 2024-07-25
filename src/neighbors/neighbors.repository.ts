import { Injectable } from "@nestjs/common";
import { neighbor, PrismaPromise } from "@prisma/client";
import { OrderBy } from "src/common/enum/order-by.enum";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class NeighborsRepository {
  constructor(private readonly prisma: PrismaService) {}
  createNeighbor(
    receiverNo: number,
    senderNo: number,
  ): PrismaPromise<neighbor> {
    return this.prisma.neighbor.create({
      data: {
        receiverNo,
        senderNo,
      },
    });
  }

  updateNeighbor(neighborNo: number, status: boolean) {
    return this.prisma.neighbor.update({
      select: {
        no: true,
        neighborSenderNo: { select: { no: true, nickname: true } },
        neighborReceiverNo: { select: { no: true, nickname: true } },
        createdAt: true,
        status: true,
      },
      where: {
        no: neighborNo,
      },
      data: {
        status,
      },
    });
  }

  getMyNeighbors(skip: number, take: number, orderBy: OrderBy, where: object) {
    return this.prisma.neighbor.findMany({
      select: {
        no: true,
        neighborSenderNo: { select: { no: true, nickname: true } },
        neighborReceiverNo: { select: { no: true, nickname: true } },
        createdAt: true,
        status: true,
      },
      skip,
      take,
      orderBy: { no: orderBy },
      where,
    });
  }

  deleteNeighborRelationAndRequest(
    neighborNo: number,
  ): PrismaPromise<neighbor> {
    return this.prisma.neighbor.delete({
      where: {
        no: neighborNo,
      },
    });
  }

  getOneNeighborRequest(
    receiverNo: number,
    senderNo: number,
  ): PrismaPromise<neighbor> {
    return this.prisma.neighbor.findFirst({
      where: {
        receiverNo,
        senderNo,
        status: false,
      },
    });
  }

  getOneNeighbor(no: number): PrismaPromise<neighbor> {
    return this.prisma.neighbor.findUnique({
      where: {
        no,
      },
    });
  }

  checkMyNeighbor(
    receiverNo: number,
    senderNo: number,
  ): PrismaPromise<neighbor> {
    return this.prisma.neighbor.findFirst({
      where: {
        OR: [
          { receiverNo, senderNo },
          { receiverNo: senderNo, senderNo: receiverNo },
        ],
        status: true,
      },
    });
  }

  countNeighbor(where: object): PrismaPromise<number> {
    return this.prisma.neighbor.count({
      where,
    });
  }
}
