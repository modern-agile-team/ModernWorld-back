import { Injectable } from "@nestjs/common";
import { GameResult } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaTxType } from "src/prisma/prisma.type";

@Injectable()
export class RockScissorsPaperRepository {
  constructor(private readonly prisma: PrismaService) {}

  createOneRecord(
    userNo: number,
    userChoice: string,
    computerChoice: string,
    result: GameResult,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).rSPGameRecord.create({
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

  getRecords(userNo: number, date: Date) {
    return this.prisma.rSPGameRecord.findMany({
      where: {
        userNo,
        createdAt: {
          gte: date,
          lte: new Date(Number(date) + 1000 * 60 * 60 * 24),
        },
      },
    });
  }

  countRecordsByUserNo(userNo: number) {
    return this.prisma.rSPGameRecord.count({ where: { userNo } });
  }
}
