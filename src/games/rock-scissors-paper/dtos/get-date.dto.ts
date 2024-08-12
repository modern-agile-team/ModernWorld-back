import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";

export class GetDateDto {
  @ApiPropertyOptional({
    description: "날짜",
    example: "2024-8-6",
    default: (() => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    })(),
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date: Date = (() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  })();
}
