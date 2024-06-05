import { Injectable } from "@nestjs/common";
import { UserAchievementsRepository } from "./user-achievements.repository";

@Injectable()
export class UserAchievementsService {
  constructor(
    private readonly userAchievementsRepository: UserAchievementsRepository,
  ) {}
}
