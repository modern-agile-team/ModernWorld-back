import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class CreatePresentDto {
  @ApiProperty({ example: 5, minimum: 1 })
  @IsPositive()
  @IsInt()
  receiverNo: number;

  @ApiProperty({ example: 2, minimum: 1 })
  @IsPositive()
  @IsInt()
  itemNo: number;
}
