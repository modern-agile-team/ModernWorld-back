import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUserAchievementsDto {
  @ApiPropertyOptional({
    description: "칭호, 한글자만 맞아도 조회가능",
  })
  title?: string;

  @ApiPropertyOptional({
    description: "카테고리, 한글자만 맞아도 조회가능",
  })
  category?: string;
}
