import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class CommentContentDto {
  @Length(1, 100)
  @ApiProperty({
    minLength: 1,
    maxLength: 100,
  })
  content: string;
}
