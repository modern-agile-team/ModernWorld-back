import { Injectable } from "@nestjs/common";
import { AchievementsRepository } from "./achievements.repository";

@Injectable()
export class AchievementsService {
  constructor(
    private readonly achievementsRepository: AchievementsRepository,
  ) {}

  getAchievements() {
    return this.achievementsRepository.getAchievements();
  }
}
