import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
  // @IsNotEmpty()
  // receiveNo: number;
  // @IsNotEmpty()
  // senderNo: number;
  @IsNotEmpty()
  content: string;
}
