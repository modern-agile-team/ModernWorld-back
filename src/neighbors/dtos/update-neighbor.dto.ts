import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class UpdateNeighborDto {
  @ApiProperty({
    description: "이웃 / 이웃 아님 상태",
    default: true,
  })
  @IsBoolean()
  status: boolean = true;
}
