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
}
