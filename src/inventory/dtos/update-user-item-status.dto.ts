import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean } from "class-validator";

export class UpdateUserItemStatusDto {
  @ApiProperty({
    name: "status",
    example: "truefalse",
  })
  @IsBoolean()
  @Transform(({ value }) => {
    return value === "true"
      ? true
      : value === "false"
        ? false
        : BadRequestException;
  })
  status: boolean;
}
