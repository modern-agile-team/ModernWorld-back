import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

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

  getUserAchievements(userNo: number) {
    return this.prisma.userAchievement.findMany({
      select: {
        no: true,
        userNo: true,
        achievementNo: true,
        status: true,
        achievement: {
          select: {
            name: true,
            description: true,
            title: true,
            level: true,
          },
        },
      },
      where: { userNo },
    });
  }

  createOneUserAchievement(userNo: number, achievementNo: number) {
    return this.prisma.userAchievement.create({
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
