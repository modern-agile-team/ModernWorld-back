import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsPositive } from "class-validator";

export class getNeighborDto {
  @ApiProperty({
    name: "take",
    description: "가지고 올 이웃의 수",
    example: 1,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  take: number;

  @ApiProperty({
    name: "page",
    description: "페이지 번호",
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page: number;
}
