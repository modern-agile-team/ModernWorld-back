import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";

export class UpdateUserNicknameDto {
  @ApiProperty({
    description: "닉네임",
    minimum: 1,
    maximum: 10,
  })
  @MinLength(1)
  @MaxLength(10)
  nickname: string;
}
