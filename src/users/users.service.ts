import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getUserNameAndCurrentPointAndAccumulatinPointAndTitle(no: number) {
    const result = await this.prisma.user.findUnique({
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
