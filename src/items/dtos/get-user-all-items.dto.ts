import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GetUserAllItems {
  @ApiProperty({
    name: "theme",
    type: String,
    required: false,
    example: "테마이름",
  })
  @IsString()
  @IsOptional()
  theme?: string;

  @ApiProperty({
    name: "itemName",
    type: String,
    required: false,
    example: "아이템 이름",
  })
  @IsString()
  @IsOptional()
  itemName?: string;
}
