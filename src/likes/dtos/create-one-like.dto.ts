import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class CreateOneLikeDto {
  @ApiProperty({ example: 2, minimum: 1 })
  @IsInt()
  @IsPositive()
  receiverNo: number;
}
