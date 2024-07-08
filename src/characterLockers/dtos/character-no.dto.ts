import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

export class CharacterNoDto {
  @ApiProperty({ example: 1, minimum: 1 })
  @IsInt()
  @Min(1)
  characterNo: number;
}
