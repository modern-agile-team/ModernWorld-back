import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional } from "class-validator";

export class UpdateNeighborDto {
  @ApiProperty({
    name: "no",
    description: "이웃 고유번호",
    example: "1",
  })
  @IsInt()
  @IsOptional()
  no: number;

  @ApiProperty({
    name: "status",
    description: "이웃인지 아닌지 상태를 알려줌",
    example: true,
  })
  @IsBoolean()
  status: boolean;
}
