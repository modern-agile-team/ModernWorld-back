import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Max, Min } from "class-validator";

export class RockScissorsPaperDto {
  @ApiProperty({ description: "가위 : 0, 바위 : 1, 보 : 2, 패배 : 3" })
  @Min(0)
  @Max(3)
  @IsInt()
  choice: number;
}
