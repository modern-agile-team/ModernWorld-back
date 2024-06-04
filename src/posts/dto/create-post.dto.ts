import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Length } from "class-validator";

export class CreateOnePostDto {
  @ApiProperty({
    example: 1,
  })
  @IsInt()
  userNo: number;

  @ApiProperty({
    name: "content",
    example: "김뿡우",
    minLength: 1,
    maxLength: 100,
  })
  @Length(1, 100)
  content: string;
}
