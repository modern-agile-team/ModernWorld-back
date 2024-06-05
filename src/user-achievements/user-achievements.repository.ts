import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserAchievementsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getUserAchievements(userNo: number) {
    return this.prisma.userAchievement.findMany({ where: { userNo } });
  }
}
