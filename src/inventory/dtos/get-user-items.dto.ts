import { BadRequestException } from "@nestjs/common";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class GetUserItemsDto {
  @ApiPropertyOptional({ description: "테마이름" })
  theme?: string;

  @ApiPropertyOptional({ description: "사용 여부" })
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

  @ApiPropertyOptional()
  itemName?: string;
}
