import { Injectable } from "@nestjs/common";
import { AchievementsRepository } from "./achievements.repository";

@Injectable()
export class AchievementsService {
  constructor(achievementsRepository: AchievementsRepository) {}
  getAchievements() {}
}
