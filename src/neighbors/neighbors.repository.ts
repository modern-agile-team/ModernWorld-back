import { Injectable } from "@nestjs/common";
import { neighbor, PrismaPromise } from "@prisma/client";
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

  updateNeighbor(no: number, status: boolean): PrismaPromise<neighbor> {
    return this.prisma.neighbor.update({
      where: {
        no,
      },
      data: {
        status,
      },
    });
  }

  getMyNeighbors(userNo: number, skip: number, take: number) {
    return this.prisma.neighbor.findMany({
      select: {
        no: true,
        userNeighborSenderNo: { select: { no: true, nickname: true } },
        userNeighborReceiverNo: { select: { no: true, nickname: true } },
        createdAt: true,
      },
      skip,
      take,
      orderBy: { no: "desc" },
      where: {
        OR: [{ receiverNo: userNo }, { senderNo: userNo }],
        status: true,
      },
    });
  }

  rejectNeighborRequestOrDeleteNeighbor(
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
    return this.prisma.neighbor.findFirst({
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

  countNeighbor(userNo: number): PrismaPromise<number> {
    return this.prisma.neighbor.count({
      where: {
        OR: [{ receiverNo: userNo }, { senderNo: userNo }],
        status: true,
      },
    });
  }
}
