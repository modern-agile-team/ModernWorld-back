import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class GetCommentDto {
  @ApiProperty({
    name: "page",
    description: "페이지 번호",
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  page: number;

  @ApiProperty({
    name: "take",
    description: "가지고 올 방명록의 개수",
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  take: number;
}
