import { MaxLength } from "class-validator";

export class createOnePostDto {
  @MaxLength(100)
  content: string;
}
