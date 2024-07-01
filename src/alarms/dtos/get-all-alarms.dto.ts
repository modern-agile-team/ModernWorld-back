import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class getAllAlarmsDto {
  @ApiProperty({ required: false })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  take: number = 3;

  @ApiProperty({ required: false })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  page: number = 1;
}
