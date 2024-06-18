import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsPositive } from "class-validator";

export class getAllAlarmsDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  take: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  page: number;
}
