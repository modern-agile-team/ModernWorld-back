import { Injectable } from "@nestjs/common";
import { AchievementsRepository } from "./achievements.repository";
import { GetAchievementsDto } from "./dtos/get-achievements.dto";
import { AchievemetWhere } from "./interfaces/get-achievements-where.interface";

@Injectable()
export class AchievementsService {
  constructor(
    private readonly achievementsRepository: AchievementsRepository,
  ) {}

  getAchievements(queryParams: GetAchievementsDto) {
    const { title, level } = queryParams;
    const where: AchievemetWhere = { name: { contains: title }, level };

    return this.achievementsRepository.getAchievements(where);
  }
}
