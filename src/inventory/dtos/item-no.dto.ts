import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class ItemNoDto {
  @Type(() => Number)
  @ApiProperty({ minimum: 1 })
  @Min(1)
  @IsInt()
  itemNo: number;
}
