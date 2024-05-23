import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUserAllItems {
  @ApiPropertyOptional({
    name: "theme",
    example: "테마이름",
  })
  theme?: string;

  @ApiPropertyOptional({
    name: "itemName",
    example: "아이템 이름",
  })
  itemName?: string;
}
