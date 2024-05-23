import { ApiProperty } from "@nestjs/swagger";
import { MaxLength } from "class-validator";

export class UpdateUserDescriptionDto {
  @ApiProperty({
    name: "description",
    description: "자기소개",
    example: "어떻게 사람이름이 엄준식",
    maximum: 100,
  })
  @MaxLength(100)
  description: string;
}
