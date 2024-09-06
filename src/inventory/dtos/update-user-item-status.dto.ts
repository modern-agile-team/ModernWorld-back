import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class UpdateUserItemStatusDto {
  @ApiProperty({ description: "사용 여부" })
  @IsBoolean()
  status: boolean;
}
