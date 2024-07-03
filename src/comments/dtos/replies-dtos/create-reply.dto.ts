import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";

export class CreateReplyDto {
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({
    description: "방명록의 댓글 내용",
    example: "밥먹고 싶어요",
    minLength: 1,
    maxLength: 100,
  })
  content: string;
}
