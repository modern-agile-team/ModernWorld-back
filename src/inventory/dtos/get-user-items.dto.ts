import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class GetUserItemsDto {
  @ApiProperty({
    name: "theme",
    type: String,
    required: false,
    example: "테마이름",
  })
  @IsString()
  @IsOptional()
  theme?: string;

  @ApiProperty({
    name: "status",
    type: Boolean,
    required: false,
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => {
    return value === "true"
      ? true
      : value === "false"
        ? false
        : BadRequestException;
  })
  @IsOptional()
  status?: boolean;

  @ApiProperty({
    name: "itemName",
    type: String,
    required: false,
    example: "왕덕봉",
  })
  @IsString()
  @IsOptional()
  itemName?: string;
}
