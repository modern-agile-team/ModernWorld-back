import { Injectable, NotFoundException } from "@nestjs/common";
import { UserAchievementsRepository } from "./user-achievements.repository";
import { updateUserAchievementStatusDto } from "./dtos/update-user-achievement-status.dto";

@Injectable()
export class UserAchievementsService {
  constructor(
    private readonly userAchievementsRepository: UserAchievementsRepository,
  ) {}

  getUserAchievements(userNo: number) {
    return this.userAchievementsRepository.getUserAchievements(userNo);
  }

  async updateUserAchievementStatus(
    userNo: number,
    body: updateUserAchievementStatusDto,
  ) {
    const { status, achievementNo } = body;

    if (
      !(await this.userAchievementsRepository.findOneUserAchievement(
        userNo,
        achievementNo,
      ))
    )
      throw new NotFoundException("User doesn't have that Achievement.");

    if (!status)
      return this.userAchievementsRepository.updateUserAchievementStatus(
        userNo,
        status,
        achievementNo,
      );

    //트랜잭션으로 묶을것
    await this.userAchievementsRepository.updateUserAchievementStatus(
      userNo,
      false,
    );

    return this.userAchievementsRepository.updateUserAchievementStatus(
      userNo,
      status,
      achievementNo,
    );
  }
}
