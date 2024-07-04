import { Injectable } from "@nestjs/common";
import { PrismaPromise, achievement } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AchievementsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAchievementNoByName(name: string): PrismaPromise<achievement> {
    return this.prisma.achievement.findFirst({
      where: { name },
    });
  }

  getOneAchievement(no: number): PrismaPromise<achievement> {
    return this.prisma.achievement.findUnique({ where: { no } });
  }

  getAchievements(where: object): PrismaPromise<achievement[]> {
    return this.prisma.achievement.findMany({
      where,
    });
  }
}
