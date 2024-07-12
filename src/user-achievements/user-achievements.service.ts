import { Injectable, NotFoundException } from "@nestjs/common";
import { UserAchievementsRepository } from "./user-achievements.repository";
import { updateUserAchievementStatusDto } from "./dtos/update-user-achievement-status.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserAchievementsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userAchievementsRepository: UserAchievementsRepository,
  ) {}

  getUserAchievements(userNo: number) {
    return this.userAchievementsRepository.getUserAchievements(userNo);
  }

  async updateUserAchievementStatus(
    userNo: number,
    achievementNo: number,
    body: updateUserAchievementStatusDto,
  ) {
    const { status } = body;
    const userAchievement =
      await this.userAchievementsRepository.findOneUserAchievement(
        userNo,
        achievementNo,
      );

    if (!userAchievement)
      throw new NotFoundException("User doesn't have that Achievement.");

    if (!status)
      return this.userAchievementsRepository.updateUserAchievementStatusByNo(
        userAchievement.no,
        status,
      );

    //트랜잭션으로 묶을것
    const [, result] = await this.prisma.$transaction([
      this.userAchievementsRepository.updateUserAchievementStatus(
        userNo,
        false,
      ),

      this.userAchievementsRepository.updateUserAchievementStatusByNo(
        userAchievement.no,
        status,
      ),
    ]);

    return result;
  }
}
