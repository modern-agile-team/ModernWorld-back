import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GetUserAchievementsDto {
  @ApiPropertyOptional({
    description: "칭호, 한글자만 맞아도 조회가능",
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: "카테고리, 한글자만 맞아도 조회가능",
  })
  @IsString()
  @IsOptional()
  category?: string;
}
