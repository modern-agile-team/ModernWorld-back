import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserNicknameDto {
  @ApiProperty({
    name: "nickname",
    description: "닉네임",
    example: "엄준식",
  })
  @MinLength(1)
  @MaxLength(10)
  nickname: string;
}
