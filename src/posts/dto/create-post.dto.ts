import { MaxLength, MinLength } from "class-validator";

export class createOnePostDto {
  @MaxLength(100)
  @MinLength(1)
  content: string;
}
