import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";

export class createOnePostDto {
  @ApiProperty({
    name: "content",
    example: "김뿡우",
  })
  @MaxLength(100)
  @MinLength(1)
  content: string;
}
