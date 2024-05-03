import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ItemsService } from "./items.service";

@Controller("items")
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}
  @Get("")
  getUserAllItemsByTheme(@Query("theme") theme: string) {
    const userNo = 1;
    return this.itemService.getUserAllItemsByTheme(userNo, theme);
  }

  @Post(":itemNo")
  buyItem(@Param("itemNo", ParseIntPipe) itemNo: number) {
    const userNo = 1;
    return this.itemService.buyItem(userNo, itemNo);
  }

  @Post(":itemNo/present/:receiverNo")
  presentItem(
    @Param("itemNo", ParseIntPipe) itemNo: number,
    @Param("receiverNo", ParseIntPipe) receiverNo: number,
  ) {
    const userNo = 1;

    return this.itemService.presentItem(userNo, itemNo, receiverNo);
  }

  @Patch(":itemNo")
  useItem(@Param("itemNo", ParseIntPipe) itemNo: number) {
    const userNo = 1;

    return this.itemService.useItem(userNo, itemNo);
  }
}
