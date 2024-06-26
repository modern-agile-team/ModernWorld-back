import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class GetReplyDto {
  @ApiProperty({
    description: "현재 페이지 수",
    example: 1,
    minimum: 1,
    format: "integer",
  })
  @Type(() => Number)
  @IsInt()
  page: number;

  @ApiProperty({
    description: "가지고 올 댓글의 수",
    example: 2,
    minimum: 1,
    format: "integer",
  })
  @Type(() => Number)
  @IsInt()
  take: number;
}
