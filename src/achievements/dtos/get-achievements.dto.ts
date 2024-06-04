import { ApiProperty } from "@nestjs/swagger";
import { AchievementsLevelEnum } from "../enum/achievements-enum";
import { IsEnum, IsOptional } from "class-validator";

export class GetAchievementsDto {
  @ApiProperty({ name: "name", required: false })
  name?: string;

  @ApiProperty({ name: "level", required: false, enum: AchievementsLevelEnum })
  @IsOptional()
  @IsEnum(AchievementsLevelEnum)
  level?: AchievementsLevelEnum;
}
