import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class DeleteOneLikeDto {
  @ApiProperty({ example: 2, minimum: 1 })
  @IsInt()
  @IsPositive()
  receiverNo: number;
}
