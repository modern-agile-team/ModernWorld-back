import { Injectable } from "@nestjs/common";
import { GameResult } from "@prisma/client";
import { OrderBy } from "src/common/enum/order-by.enum";
import { PrismaService } from "src/prisma/prisma.service";
import { orderByField } from "src/users/enum/orderByFeild.enum";

@Injectable()
export class RockScissorsPaperRepository {
  constructor(private readonly prisma: PrismaService) {}

  createOneRecord(
    userNo: number,
    userChoice: string,
    computerChoice: string,
    result: GameResult,
  ) {
    return this.prisma.rSPGameRecord.create({
      select: {
        userChoice: true,
        computerChoice: true,
        result: true,
        createdAt: true,
        user: { select: { no: true, nickname: true, chance: true } },
      },

      data: { userNo, userChoice, computerChoice, result },
    });
  }

  getRecords(
    take: number,
    where: {
      userNo: number;
    },
    skip: number,
    orderBy: { no: OrderBy },
  ) {
    return this.prisma.rSPGameRecord.findMany({ take, where, skip, orderBy });
  }

  countRecordsByUserNo(userNo: number) {
    return this.prisma.rSPGameRecord.count({ where: { userNo } });
  }
}
