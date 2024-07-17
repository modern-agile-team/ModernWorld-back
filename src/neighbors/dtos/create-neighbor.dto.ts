import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class CreateNeighborDto {
  @ApiProperty({
    name: "receiverNo",
    description: "이웃 요청을 받는 유저번호",
    example: 1,
  })
  @IsPositive()
  @IsInt()
  receiverNo: number;
}
