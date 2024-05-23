import { BadRequestException } from "@nestjs/common";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class GetUserItemsDto {
  @ApiPropertyOptional({
    name: "theme",
    example: "테마이름",
  })
  theme?: string;

  @ApiPropertyOptional({
    name: "status",
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

  @ApiPropertyOptional({
    name: "itemName",
    example: "왕덕봉",
  })
  itemName?: string;
}
