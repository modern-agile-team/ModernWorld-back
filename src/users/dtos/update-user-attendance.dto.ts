import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Max, Min } from "class-validator";

export class UpdateUserAttendanceDto {
  @ApiProperty({
    description: "출석부에 기록할 스티커 번호",
    minimum: 1,
    maximum: 10,
    type: Number,
  })
  @Min(1)
  @Max(10)
  @IsInt()
  stickerNo: number;
}
