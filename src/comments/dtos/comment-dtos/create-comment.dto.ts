import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class CreateCommentDto {
  @Length(1, 100)
  @ApiProperty({
    description: "방명록 내용",
    example: "밥먹고 싶어요",
    minLength: 1,
    maxLength: 100,
  })
  content: string;
}
