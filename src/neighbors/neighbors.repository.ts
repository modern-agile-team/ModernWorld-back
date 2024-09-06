import { Injectable } from "@nestjs/common";
import { OrderBy } from "src/common/enum/order-by.enum";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaTxType } from "src/prisma/prisma.type";
import { DEFAULT_NEIGHBORS_SELECT_OPTIONS } from "./constants/default-neighbors-select-options.constants";
import { GET_NEIGHBORS_SELECT_OPTIONS } from "./constants/get-neighbors-select-options.constant";

@Injectable()
export class NeighborsRepository {
  constructor(private readonly prisma: PrismaService) {}
  createNeighbor(receiverNo: number, senderNo: number, tx?: PrismaTxType) {
    return (tx ?? this.prisma).neighbor.create({
      select: {
        ...DEFAULT_NEIGHBORS_SELECT_OPTIONS,
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
        ...DEFAULT_NEIGHBORS_SELECT_OPTIONS,
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
      select: { ...GET_NEIGHBORS_SELECT_OPTIONS },
      skip,
      take,
      orderBy: { createdAt: orderBy },
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
