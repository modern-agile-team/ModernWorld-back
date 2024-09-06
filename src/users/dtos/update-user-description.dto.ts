import { ApiProperty } from "@nestjs/swagger";
import { MaxLength } from "class-validator";

export class UpdateUserDescriptionDto {
  @ApiProperty({
    description: "자기소개",
    maximum: 100,
  })
  @MaxLength(100)
  description: string;
}
