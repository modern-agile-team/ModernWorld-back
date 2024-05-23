import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @MaxLength(100)
  content: string;
}
