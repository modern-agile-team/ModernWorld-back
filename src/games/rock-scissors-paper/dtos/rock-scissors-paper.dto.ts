import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Max, Min } from "class-validator";

export class RockScissorsPaperDto {
  @ApiProperty({ description: "가위 : 0, 바위 : 1, 보 : 2" })
  @Min(0)
  @Max(2)
  @IsInt()
  choice: number;
}
