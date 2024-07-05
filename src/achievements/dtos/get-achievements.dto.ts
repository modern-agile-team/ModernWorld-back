import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AchievementLevelEnum } from "../enum/achievements.enum";
import { IsEnum } from "class-validator";

export class GetAchievementsDto {
  @ApiProperty({ name: "name", required: false })
  name?: string;

  @ApiPropertyOptional({
    name: "level",
    enum: AchievementLevelEnum,
  })
  @IsEnum(AchievementLevelEnum)
  level?: AchievementLevelEnum;
}
