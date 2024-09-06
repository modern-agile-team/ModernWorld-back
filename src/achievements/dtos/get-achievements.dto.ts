import { ApiPropertyOptional } from "@nestjs/swagger";
import { AchievementLevelEnum } from "../enum/achievements.enum";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetAchievementsDto {
  @ApiPropertyOptional({ description: "칭호" })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: "단계",
    enum: AchievementLevelEnum,
  })
  @IsEnum(AchievementLevelEnum)
  @IsOptional()
  level?: AchievementLevelEnum;
}
