import { Injectable } from "@nestjs/common";
import { neighbor, PrismaPromise } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class NeighborRepository {
  constructor(private readonly prisma: PrismaService) {}
  neighborRequest(
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

  neighborApproval(no: number, status: boolean): PrismaPromise<neighbor> {
    return this.prisma.neighbor.update({
      where: {
        no,
      },
      data: {
        status,
      },
    });
  }

  getMyNeighbors(
    userNo: number,
    take: number,
    skip: number,
  ): PrismaPromise<neighbor[]> {
    return this.prisma.neighbor.findMany({
      skip,
      take,
      orderBy: { no: "desc" },
      where: {
        OR: [{ receiverNo: userNo }, { senderNo: userNo }],
        status: true,
      },
    });
  }

  neighborRequestRefusalOrDelete(neighborNo: number): PrismaPromise<neighbor> {
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
        status: true,
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
}
