import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AchievemetWhere } from "./interfaces/get-achievements-where.interface";
import { PrismaTxType } from "src/prisma/prisma.type";

@Injectable()
export class AchievementsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAchievementNoByName(name: string, tx?: PrismaTxType) {
    return (tx ?? this.prisma).achievement.findFirst({
      where: { name },
    });
  }

  getAchievements(where: AchievemetWhere) {
    return this.prisma.achievement.findMany({
      select: {
        no: true,
        title: true,
        description: true,
        level: true,
        point: true,
      },
      where,
    });
  }
}
