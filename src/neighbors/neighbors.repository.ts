import { Injectable } from "@nestjs/common";
import { OrderBy } from "src/common/enum/order-by.enum";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaTxType } from "src/prisma/prisma.type";

@Injectable()
export class NeighborsRepository {
  constructor(private readonly prisma: PrismaService) {}
  createNeighbor(receiverNo: number, senderNo: number, tx?: PrismaTxType) {
    return (tx ?? this.prisma).neighbor.create({
      select: {
        no: true,
        neighborSenderNo: { select: { no: true, nickname: true } },
        neighborReceiverNo: { select: { no: true, nickname: true } },
        createdAt: true,
        status: true,
      },
      data: {
        receiverNo,
        senderNo,
      },
    });
  }

  setNeighborStatusTrue(neighborNo: number, tx?: PrismaTxType) {
    return (tx ?? this.prisma).neighbor.update({
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
        status: true,
      },
    });
  }

  getMyNeighbors(skip: number, take: number, orderBy: OrderBy, where: object) {
    return this.prisma.neighbor.findMany({
      select: {
        no: true,
        neighborSenderNo: {
          select: {
            no: true,
            nickname: true,
            image: true,
            description: true,
            userAchievement: {
              select: {
                achievement: { select: { title: true, level: true } },
              },
              where: { status: true },
            },
          },
        },
        neighborReceiverNo: {
          select: {
            no: true,
            nickname: true,
            image: true,
            description: true,
            userAchievement: {
              select: {
                achievement: { select: { title: true, level: true } },
              },
              where: { status: true },
            },
          },
        },
        createdAt: true,
        status: true,
      },
      skip,
      take,
      orderBy: { no: orderBy },
      where,
    });
  }

  deleteNeighbor(neighborNo: number) {
    return this.prisma.neighbor.delete({
      where: {
        no: neighborNo,
      },
    });
  }

  getOneNeighborRequest(receiverNo: number, senderNo: number) {
    return this.prisma.neighbor.findFirst({
      where: {
        receiverNo,
        senderNo,
        status: false,
      },
    });
  }

  getOneNeighbor(no: number) {
    return this.prisma.neighbor.findUnique({
      where: {
        no,
      },
    });
  }

  checkMyNeighbor(receiverNo: number, senderNo: number) {
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

  countNeighbor(where: object) {
    return this.prisma.neighbor.count({
      where,
    });
  }
}
