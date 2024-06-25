import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class GetReplyDto {
  @ApiProperty({
    name: "page",
    description: "댓글 페이지 수",
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  page: number;

  @ApiProperty({
    name: "take",
    description: "가지고 올 댓글의 수",
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  take: number;
}
