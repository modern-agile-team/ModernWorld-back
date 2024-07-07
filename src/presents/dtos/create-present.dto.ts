import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class CreateOnePresentDto {
  @ApiProperty({ example: 1, minimum: 3 })
  @IsPositive()
  @IsInt()
  receiverNo: number;

  @ApiProperty({ example: 2, minimum: 1 })
  @IsPositive()
  @IsInt()
  itemNo: number;
}
