import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class UpdateUserDescriptionDto {
  @ApiProperty({
    name: "description",
    type: String,
    required: true,
    description: "자기소개",
    example: "어떻게 사람이름이 엄준식",
  })
  @IsString()
  @MaxLength(100)
  description: string;
}
