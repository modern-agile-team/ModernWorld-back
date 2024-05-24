import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ description: "방명록 내용", default: "밥먹고 싶어요" })
  content: string;
}
