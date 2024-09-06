import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GetUserAllItems {
  @ApiPropertyOptional({
    description: "테마 이름",
  })
  @IsString()
  @IsOptional()
  theme?: string;

  @ApiPropertyOptional({
    description: "아이템 이름",
  })
  @IsString()
  @IsOptional()
  itemName?: string;
}
