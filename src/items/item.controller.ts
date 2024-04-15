import { Controller, Get, Param } from "@nestjs/common";
import { ItemsService } from "./items.service";

@Controller("items")
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}
  @Get(":theme")
  showItems(@Param("theme") theme: string) {
    return this.itemService.showItems(theme);
  }
}
