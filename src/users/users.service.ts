import { Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class UsersService {
  async getUserNameAndCurrentPointAndAccumulatinPoint(no: number) {
    const prisma = new PrismaClient();
    const result = await prisma.user.findUnique({
      where: {
        no,
      },

      select: {
        nickname: true,
        currentPoint: true,
        accumulationPoint: true,
        user_achievement: {
          select: {
            achievement: { select: { title: true } },
          },
        },
      },
    });

    return result;
  }
}
