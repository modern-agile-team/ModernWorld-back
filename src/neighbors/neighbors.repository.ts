import { Injectable } from "@nestjs/common";
import { neighbor, PrismaPromise } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class NeighborRepository {
  constructor(private readonly prisma: PrismaService) {}
  neighborRequest(
    receiverNo: number,
    senderNo: number,
    status: boolean,
  ): PrismaPromise<neighbor> {
    return this.prisma.neighbor.create({
      data: {
        receiverNo,
        senderNo,
        status,
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
}
