import { Controller, Get, Param, Query } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { ApiTags } from "@nestjs/swagger";
import { GetUserAllItems } from "./dtos/get-user-all-items.dto";
import { ApiGetItems } from "./items-swagger/get-items.decorator";
import { ApiGetOneItem } from "./items-swagger/get-one-item.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";

@Controller("items")
@ApiTags("Items")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiGetItems()
  getItems(@Query() queryParms: GetUserAllItems) {
    return this.itemsService.getItems(queryParms);
  }

  @Get(":itemNo")
  @ApiGetOneItem()
  getOneItem(@Param("itemNo", ParsePositiveIntPipe) itemNo: number) {
    return this.itemsService.getOneItem(itemNo);
  }
}
