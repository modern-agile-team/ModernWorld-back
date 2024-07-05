import { ApiPropertyOptional } from "@nestjs/swagger";
import { AchievementLevelEnum } from "../enum/achievements.enum";
import { IsEnum, IsOptional } from "class-validator";

export class GetAchievementsDto {
  @ApiPropertyOptional({ name: "name", default: "" })
  name: string = "";

  @ApiPropertyOptional({
    name: "level",
    enum: AchievementLevelEnum,
  })
  @IsEnum(AchievementLevelEnum)
  @IsOptional()
  level?: AchievementLevelEnum;
}
