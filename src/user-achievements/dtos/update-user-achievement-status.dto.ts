import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, Min } from "class-validator";

export class updateUserAchievementStatusDto {
  @ApiProperty({ name: "status", required: false })
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
