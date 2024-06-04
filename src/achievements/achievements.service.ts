import { Injectable } from "@nestjs/common";
import { AchievementsRepository } from "./achievements.repository";
import { GetAchievementsDto } from "./dtos/get-achievements.dto";

@Injectable()
export class AchievementsService {
  constructor(
    private readonly achievementsRepository: AchievementsRepository,
  ) {}

  getAchievements(queryParams: GetAchievementsDto) {
    const { name, level } = queryParams;
    const where = { name: { contains: name }, level };

    return this.achievementsRepository.getAchievements(where);
  }
}
