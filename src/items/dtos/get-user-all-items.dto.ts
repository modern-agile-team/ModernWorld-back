import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUserAllItems {
  @ApiPropertyOptional({
    description: "테마 이름",
  })
  theme?: string;

  @ApiPropertyOptional({
    description: "아이템 이름",
  })
  itemName?: string;
}
