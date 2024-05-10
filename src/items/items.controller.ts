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
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("items")
@ApiTags("Items")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  @ApiOperation({
    summary: "아이템 테마별로 가져오기 API",
  })
  getUserItems(@Query("theme") theme?: string) {
    return this.itemsService.getUserItems(theme);
  }

  @Get(":itemNo")
  @ApiOperation({
    summary: "특정 아이템 가져오기 API",
  })
  getOneItem(@Param("itemNo", ParseIntPipe) itemNo: number) {
    return this.itemsService.getOneItem(itemNo);
  }
}
