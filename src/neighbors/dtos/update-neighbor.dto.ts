import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class UpdateNeighborDto {
  @ApiProperty({
    description: "이웃인지 아닌지 상태를 알려줌",
    example: true,
  })
  @IsBoolean()
  status: boolean;
}
