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
  @Post("/:itemNo/buy")
  buyitems(@Param("itemNo", ParseIntPipe) itemNo: number) {
    const userNo = 1;
    return this.itemService.buyItem(userNo, itemNo);
  }
}
