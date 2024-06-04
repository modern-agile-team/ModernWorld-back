import { Injectable } from "@nestjs/common";
import { PrismaPromise, achievement } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AchievementsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAchievements(): PrismaPromise<achievement[]> {
    return this.prisma.achievement.findMany({ where: {} });
  }
}
