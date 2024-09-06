import { AchievementLevelEnum } from "../enum/achievements.enum";

export interface AchievemetWhere {
  name: { contains: string };
  level: AchievementLevelEnum;
}
