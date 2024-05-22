import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class UpdateUserItemStatusDto {
  @ApiProperty({
    name: "status",
    example: true,
  })
  @IsBoolean()
  status: boolean;
}
