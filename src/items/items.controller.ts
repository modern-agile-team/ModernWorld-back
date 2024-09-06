import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { ApiTags } from "@nestjs/swagger";
import { GetUserAllItems } from "./dtos/get-user-all-items.dto";
import { ApiGetItems } from "./items-swagger/get-items.decorator";
import { ApiGetOneItem } from "./items-swagger/get-one-item.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";

@Controller("items")
@ApiTags("Items")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiGetItems()
  @UseGuards(AccessTokenAuthGuard)
  getItems(@Query() query: GetUserAllItems) {
    return this.itemsService.getItems(query);
  }

  @Get(":itemNo")
  @ApiGetOneItem()
  @UseGuards(AccessTokenAuthGuard)
  getOneItem(@Param("itemNo", ParsePositiveIntPipe) itemNo: number) {
    return this.itemsService.getOneItem(itemNo);
  }
}
