import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { ApiTags } from "@nestjs/swagger";
import { GetUserItemsDto } from "./dtos/get-user-items.dto";
import { UpdateUserItemStatusDto } from "./dtos/update-user-item-status.dto";
import { ApiGetUserItems } from "./inventory-swagger/get-user-items.decorator";
import { ApiCreateUserItem } from "./inventory-swagger/create-user-item.decorator";
import { ApiUpdateUserItem } from "./inventory-swagger/update-user-item.decorator";
import { ItemNoDto } from "./dtos/item-no.dto";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";

@Controller()
@ApiTags("Inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get("users/:userNo/items")
  @ApiGetUserItems()
  getUserItems(
    @Param("userNo", ParsePositiveIntPipe) userNo: number,
    @Query() query: GetUserItemsDto,
  ) {
    return this.inventoryService.getUserItems(userNo, query);
  }

  @Post("users/my/items")
  @ApiCreateUserItem()
  createUserOneItem(@Body() body: ItemNoDto) {
    const userNo = 1;

    return this.inventoryService.createUserOneItem(userNo, body);
  }

  @Patch("users/my/items/:itemNo")
  @ApiUpdateUserItem()
  updateItemStatus(
    @Param("itemNo", ParsePositiveIntPipe) itemNo: number,
    @Body() body: UpdateUserItemStatusDto,
  ) {
    const userNo = 1;

    return this.inventoryService.updateItemStatus(userNo, itemNo, body);
  }
}
