import { ApiProperty } from "@nestjs/swagger";
import { Matches } from "class-validator";

export class UpdateUserNicknameDto {
  @ApiProperty({
    description: "닉네임",
    pattern: "^[a-zA-Z가-힣0-9]{2,10}$",
  })
  @Matches(RegExp("^[a-zA-Z가-힣0-9]{2,10}$"))
  nickname: string;
}
