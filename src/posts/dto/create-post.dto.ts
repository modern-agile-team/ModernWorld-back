import { ApiProperty } from "@nestjs/swagger";
import { Length, MaxLength, MinLength } from "class-validator";

export class CreateOnePostDto {
  @ApiProperty({
    name: "content",
    example: "김뿡우",
  })
  @Length(1, 100)
  content: string;
}
