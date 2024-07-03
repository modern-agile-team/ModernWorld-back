import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsPositive } from "class-validator";

export class GetReplyDto {
  @ApiProperty({
    description: "현재 페이지 수",
    example: 1,
    minimum: 1,
    format: "integer",
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page: number;

  @ApiProperty({
    description: "가지고 올 댓글의 수",
    example: 2,
    minimum: 1,
    format: "integer",
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  take: number;
}
