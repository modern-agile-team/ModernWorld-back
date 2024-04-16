import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { ItemsService } from "./items.service";

@Controller("items")
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}
  @Get(":theme")
  showItems(@Param("theme") theme: string) {
    return this.itemService.showItems(theme);
  }
  @Post("buy")
  buyitems(
    @Param("userNo", ParseIntPipe) userNo: number,
    @Query("itemNo", ParseIntPipe) itemNo: number,
  ) {
    return this.itemService.buyItem(userNo, itemNo);
  }
}
