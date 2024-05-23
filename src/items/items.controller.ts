import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { GetUserAllItems } from "./dtos/get-user-all-items.dto";

@Controller("items")
@ApiTags("Items")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  @ApiOperation({
    summary: "아이템 가져오기 API",
  })
  getItems(@Query() queryParms: GetUserAllItems) {
    return this.itemsService.getItems(queryParms);
  }

  @Get(":itemNo")
  @ApiOperation({
    summary: "특정 아이템 가져오기 API",
  })
  getOneItem(@Param("itemNo", ParseIntPipe) itemNo: number) {
    return this.itemsService.getOneItem(itemNo);
  }
}
