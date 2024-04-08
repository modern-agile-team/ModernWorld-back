import { Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class UsersService {
  async getUserNameAndCurrentPointAndAccumulatinPointAndTitle(no: number) {
    const prisma = new PrismaClient();
    const result = await prisma.user.findUnique({
      where: {
        no,
      },

      select: {
        nickname: true,
        currentPoint: true,
        accumulationPoint: true,
        userAchievement: {
          where: { status: true },
          select: {
            achievement: { select: { title: true, fontColor: true } },
          },
        },
      },
    });

    return {
      nickname: result.nickname,
      currentPoint: result.currentPoint,
      accumulationPoint: result.accumulationPoint,
      title: result.userAchievement[0].achievement.title,
      fontColor: result.userAchievement[0].achievement.fontColor,
    };
  }
}
