import { Injectable } from "@nestjs/common";
import { UserAchievementsRepository } from "./user-achievements.repository";
import { AchievementsRepository } from "src/achievements/achievements.repository";

@Injectable()
export class UserAchievementsService {
  constructor(
    private readonly userAchievementsRepository: UserAchievementsRepository,
    private readonly achievementsRepository: AchievementsRepository,
  ) {}

  getUserAchievements(userNo: number) {
    return this.userAchievementsRepository.getUserAchievements(userNo);
  }
}
