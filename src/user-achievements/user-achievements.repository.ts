import { Injectable } from "@nestjs/common";
import { title } from "process";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaTxType } from "src/prisma/prisma.type";

@Injectable()
export class UserAchievementsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOneAchievementByName(userNo: number, achievementName: string) {
    return this.prisma.userAchievement.findFirst({
      where: { userNo, achievement: { name: achievementName } },
    });
  }

  findOneUserAchievement(userNo: number, achievementNo: number) {
    return this.prisma.userAchievement.findFirst({
      where: { userNo, achievementNo },
    });
  }

  getUserAchievements(userNo: number, title: string, category: string) {
    return this.prisma.userAchievement.findMany({
      select: {
        no: true,
        userNo: true,
        achievementNo: true,
        status: true,
        achievement: {
          select: {
            title: true,
            description: true,
            level: true,
            category: true,
          },
        },
      },
      where: {
        userNo,
        achievement: {
          AND: [
            { title: { contains: title } },
            { category: { contains: category } },
          ],
        },
      },
    });
  }

  createOneUserAchievement(
    userNo: number,
    achievementNo: number,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).userAchievement.create({
      data: { userNo, achievementNo },
    });
  }

  updateUserAchievementStatus(
    userNo: number,
    status: boolean,
    achievementNo?: number,
  ) {
    return this.prisma.userAchievement.updateMany({
      data: { status },
      where: { userNo, achievementNo },
    });
  }

  updateUserAchievementStatusByNo(no: number, status: boolean) {
    return this.prisma.userAchievement.update({
      data: { status },
      where: { no },
    });
  }
}
