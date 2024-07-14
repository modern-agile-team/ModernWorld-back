import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class ItemNoDto {
  @ApiProperty({ example: 2, minimum: 1 })
  @IsPositive()
  @IsInt()
  itemNo: number;
}
