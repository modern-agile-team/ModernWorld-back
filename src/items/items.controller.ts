import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ItemsService } from "./items.service";

@Controller("items")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  getUserItems(@Query("theme") theme?: string) {
    return this.itemsService.getUserItems(theme);
  }

  @Get(":itemNo")
  getOneItem(@Param("itemNo", ParseIntPipe) itemNo: number) {
    return this.itemsService.getOneItem(itemNo);
  }

  @Post(":itemNo")
  buyItem(@Param("itemNo", ParseIntPipe) itemNo: number) {
    const userNo = 1;
    return this.itemsService.buyOneItem(userNo, itemNo);
  }

  @Patch(":itemNo")
  useItem(@Param("itemNo", ParseIntPipe) itemNo: number) {
    const userNo = 1;

    return this.itemsService.useItemDisuseOthers(userNo, itemNo);
  }
}
