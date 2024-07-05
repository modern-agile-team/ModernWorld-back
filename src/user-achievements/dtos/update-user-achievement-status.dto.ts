import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsInt, Min } from "class-validator";

export class updateUserAchievementStatusDto {
  @ApiPropertyOptional({ name: "status" })
  @IsBoolean()
  status: boolean;

  @ApiProperty({
    name: "achievementNo",
    required: false,
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  achievementNo: number;
}
