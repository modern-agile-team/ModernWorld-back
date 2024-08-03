import { Injectable } from "@nestjs/common";
import { GameResult } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

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
}
