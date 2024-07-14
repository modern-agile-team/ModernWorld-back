import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUserAllItems {
  @ApiPropertyOptional({
    name: "theme",
    description: "테마 이름",
  })
  theme?: string;

  @ApiPropertyOptional({
    name: "itemName",
    description: "아이템 이름",
  })
  itemName?: string;
}
